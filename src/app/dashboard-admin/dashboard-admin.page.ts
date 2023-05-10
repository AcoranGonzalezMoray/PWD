import {Component, NgModule, OnInit} from '@angular/core';

import { Observable } from 'rxjs';
import { DashboardAdminService } from '../services/dashboard-admin.service';
import { ProductShopService } from '../services/product-shop.service';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Order } from '../interfaces/order';
import { User } from '../interfaces/user';
import { Reserve } from '../interfaces/reserve';
import { Product } from '../interfaces/product';
import {map} from "rxjs/operators";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';



@NgModule({
  imports: [
    FormsModule
  ]
})

export class AppModule { }


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.page.html',
  styleUrls: ['./dashboard-admin.page.scss'],
})
export class DashboardAdminPage implements OnInit {


  public users: Observable<User[]>
  public numberOfUsers: number | undefined
  public orders: Observable<Order[]>
  public numberOfOrders: number | undefined
  public reservations: Observable<Reserve[]>
  public numberOfReservations: number | undefined
  public selectedOrder: Order | undefined;
  public selectedReserve: Reserve | undefined
  public products: Observable<Product[]> | undefined
  public product: Product | undefined;

  constructor(private dashboardAdminService: DashboardAdminService, private  productShopService: ProductShopService,
  private firestore: AngularFirestore, private router:Router,public  userService: UserService) {
    var user = {email: '', userName:'', role:'user'}
    var data = sessionStorage.getItem('userData')
    data?user = JSON.parse(data):null

    data && user.role!='admin'?router.navigate(['']):null    
    this.users = this.dashboardAdminService.getUsers()
    this.orders = this.dashboardAdminService.getOrders()
    this.reservations = this.dashboardAdminService.getReservations()
  }

  ngOnInit() {
    this.dashboardAdminService.getNumberOfUsers().subscribe(numberOfUsers => {
      this.numberOfUsers = numberOfUsers;
    });
    this.dashboardAdminService.getNumberOfOrders().subscribe(numberOfOrders => {
      this.numberOfOrders = numberOfOrders;
    });
    this.dashboardAdminService.getNumberOfReservations().subscribe(numberOfReservations => {
      this.numberOfReservations = numberOfReservations;
    });
  }

  deleteOrder(orderId: any, userName: any) {
    this.dashboardAdminService.deleteOrder(orderId, userName);
  }

  deleteReserve(reserveId: any, userName: any) {
    this.dashboardAdminService.deleteReserve(reserveId, userName);
  }

  searchProduct(nombre: string) {
    this.products = this.firestore.collection('ProductosTienda', ref => ref.where('NombreCorto',
      '==', nombre.toUpperCase()))
      .snapshotChanges().pipe(
       map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    this.products.subscribe((products: Product[]) => {
      this.product = products[0];
    });

  }

  async saveChanges() {
    const formData = {
      NombreCorto: (document.getElementById('ProductName') as HTMLInputElement).value,
      FAMILIA: (document.getElementById('ProductFamily') as HTMLInputElement).value,
      CATEGORIA: (document.getElementById('ProductCategory') as HTMLInputElement).value,
      PROVEEDOR: (document.getElementById('ProductProveedor') as HTMLInputElement).value,
      PVP: (document.getElementById('ProductPvp') as HTMLInputElement).value,
      IMAGEN: (document.getElementById('ProductImage') as HTMLInputElement).value,
      CodBarras: (document.getElementById('ProductCodBarras') as HTMLInputElement).value,
      posCode: (document.getElementById('ProductPosCode') as HTMLInputElement).value
    };

    const productosTiendaRef = await this.firestore.collection('ProductosTienda', ref => ref.where(
      'CodBarras', '==', formData.CodBarras
    ))
      .get()
      .toPromise()
      .then(querySnapshot => {
        if (querySnapshot && querySnapshot.docs && querySnapshot.docs.length > 0) {
          return querySnapshot.docs[0].id;
        } else {
          return "null";
        }
      });

    const productRef = this.firestore.collection('ProductosTienda').doc(productosTiendaRef);
    productRef.get().subscribe((doc) => {
      if (doc.exists) {
        // Update the existing document
        productRef.update(formData).then(() => {
          console.log('Document updated successfully');
        }).catch((error) => {
          console.error('Error updating document:', error);
        });
      } else {
        // Create a new document
        this.firestore.collection('ProductosTienda').add(formData).then((docRef) => {
          console.log('Document created with ID: ', docRef.id);
        }).catch((error) => {
          console.error('Error creating document:', error);
        });
      }
    });
  }

  async deleteProduct() {
    const codBarras = (document.getElementById('ProductCodBarras') as HTMLInputElement).value;

    const productosTiendaRef = await this.firestore.collection('ProductosTienda', ref => ref.where(
      'CodBarras', '==', codBarras
    ))
      .get()
      .toPromise()
      .then(querySnapshot => {
        if (querySnapshot && querySnapshot.docs && querySnapshot.docs.length > 0) {
          return querySnapshot.docs[0].id;
        } else {
          return null;
        }
      });

    if (productosTiendaRef) {
      const productRef = this.firestore.collection('ProductosTienda').doc(productosTiendaRef);
      productRef.delete().then(() => {
        console.log('Document deleted successfully');
      }).catch((error) => {
        console.error('Error deleting document:', error);
      });
    } else {
      console.log('Product not found');
    }
  }

  showCategoryMov(i: boolean) {
    const aside: any = document.querySelector("#asideAdmin")
    i ? aside.style = "display:block;" : aside.style = "display:none;"
  }
}
