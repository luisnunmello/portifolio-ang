import { Injectable } from '@angular/core';
import { Notification } from '../../types/notification.type';
import { Observable, of, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationObservable: Subject<Notification> = new Subject<Notification>();

  constructor() { }

  show(notification: Notification) {
    this.notificationObservable.next(notification);
  }
}
