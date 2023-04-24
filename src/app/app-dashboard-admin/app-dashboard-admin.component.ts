import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShoppingCartService } from '../services/firestore/shoppingCart.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product } from '../services/firestore/interfaces/product';
import { Reserva } from '../services/firestore/interfaces/reserva';
import { Pedido } from '../services/firestore/interfaces/pedido';
import { User } from '../services/firestore/interfaces/user';

@Component({
  selector: 'app-app-dashboard-admin',
  templateUrl: './app-dashboard-admin.component.html',
  styleUrls: ['./app-dashboard-admin.component.css']
})
export class AppDashboardAdminComponent {

  private usersCollection: Observable<User[]> | undefined;
  public reservas: Reserva[] = []
   constructor(private firestore: AngularFirestore) {}

   ngOnInit() {
    this.usersCollection = this.firestore.collection<User>('USUARIOS').valueChanges();

    this.firestore.collection<User>('USUARIOS').get().subscribe(snapshot => {
      snapshot.forEach(doc => {
        const user = doc.data() as User;
        this.reservas.push(user.reservations.every);
      });
    });
  }
}
