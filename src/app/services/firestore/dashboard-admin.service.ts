import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './interfaces/user';
import { Order } from './interfaces/order';
import { Reserve } from './interfaces/reserve';

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
}
