import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { DashboardAdminService } from '../services/firestore/dashboard-admin.service';
import { FileUploadService } from "../services/firestore/file-upload.service";
import { Order } from '../services/firestore/interfaces/order';
import { User } from '../services/firestore/interfaces/user';
import { Reserve } from '../services/firestore/interfaces/reserve';

@Component({
  selector: 'app-app-dashboard-admin',
  templateUrl: './app-dashboard-admin.component.html',
  styleUrls: ['./app-dashboard-admin.component.css']
})

export class AppDashboardAdminComponent {

  public users: Observable<User[]>
  public numberOfUsers: number | undefined
  public orders: Observable<Order[]>
  public numberOfOrders: number | undefined
  public reservations: Observable<Reserve[]>
  public numberOfReservations: number | undefined
  public selectedOrder: Order | undefined;
  public showOrderDetails = false;

  public selectedReserve: Reserve | undefined

  public showReserveDetails = false;

  constructor(private dashboardAdminService: DashboardAdminService, private uploadService: FileUploadService) {
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

  getshowOrderDetails(order: Order) {
    this.selectedOrder = order;
    this.showOrderDetails = true;
  }

  hideOrderDetails() {
    this.showOrderDetails = false;
  }

  deleteOrder(orderId: any, userName: any) {
    this.dashboardAdminService.deleteOrder(orderId, userName);
  }

  getshowReserveDetails(reserve: Reserve) {
    this.selectedReserve = reserve;
    this.showReserveDetails = true;
  }

  hideReserveDetails() {
    this.showReserveDetails = false;
  }

  deleteReserve(reserveId: any, userName: any) {
    this.dashboardAdminService.deleteReserve(reserveId, userName);
  }
}
