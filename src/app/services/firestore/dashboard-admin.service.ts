import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './interfaces/user';
import { Order } from './interfaces/order';
import { Reserve } from './interfaces/reserve';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class DashboardAdminService {

  private usersCollection: AngularFirestoreCollection<User>;
  users$: Observable<User[]>;

  constructor(private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection<User>('USUARIOS');
    this.users$ = this.usersCollection.valueChanges();
  }

  getUsers(): Observable<User[]> {
    return this.users$
  }

  getNumberOfUsers(): Observable<number> {
    return this.usersCollection.get().pipe(
      map(querySnapshot => querySnapshot.size)
    );
  }

  getOrders(): Observable<Order[]> {
    return this.users$.pipe(
      map(users => {
        let orders: Order[] = [];
        users.forEach(user => {
          if (user.orders) {
            orders = orders.concat(user.orders);
          }
        });
        return orders;
      })
    );
  }

  getNumberOfOrders(): Observable<number> {
    return this.getOrders().pipe(
      map(orders => orders.length)
    );
  }

  async deleteOrder(orderId: string, userName: string): Promise<void> {
    const userId = await this.getUserIdByUserName(userName);
    this.firestore.collection('USUARIOS').doc(userId).valueChanges().subscribe((userData: any) => {
      const orders: any[] = userData.orders;
      const index = orders.findIndex(order => order.UUIDV4 === orderId);
      if (index !== -1) {
        this.firestore.collection('USUARIOS').doc(userId).update({
          orders: firebase.firestore.FieldValue.arrayRemove(orders[index])
        });
      }
    });
  }

  getReservations(): Observable<Reserve[]> {
    return this.users$.pipe(
      map(users => {
        let reservations: Reserve[] = [];
        users.forEach(user => {
          if (user.reservations) {
            reservations = reservations.concat(user.reservations);
          }
        });
        return reservations;
      })
    );
  }

  getNumberOfReservations(): Observable<number> {
    return this.getReservations().pipe(
      map(reservations => reservations.length)
    );
  }

  async deleteReserve(reserveId: any, userName: any) {
    const userId = await this.getUserIdByUserName(userName);
    this.firestore.collection('USUARIOS').doc(userId).valueChanges().subscribe((userData: any) => {
      const reservations: any[] = userData.reservations;
      const index = reservations.findIndex(reserve => reserve.UUIDV4 === reserveId);
      if (index !== -1) {
        this.firestore.collection('USUARIOS').doc(userId).update({
          reservations: firebase.firestore.FieldValue.arrayRemove(reservations[index])
        });
      }
    });
  }

  getUserIdByUserName(userName: string): Promise<string> {
    return this.firestore.collection('USUARIOS', ref => ref.where('userName', '==', userName))
      .get()
      .toPromise()
      .then(querySnapshot => {
        if (querySnapshot && querySnapshot.docs && querySnapshot.docs.length > 0) {
          return querySnapshot.docs[0].id;
        } else {
          return "null";
        }
      });
  }
}
