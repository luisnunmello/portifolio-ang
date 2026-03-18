import { Component } from '@angular/core';
import { NotificationService } from '../../../service/notification/notification.service';
import { Notification } from '../../../types/notification.type';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  notification?: Notification = undefined;
  notificationStatusMessage?: string = undefined;
  isError?: boolean = undefined;
  onClose?: () => void = undefined;
  constructor(private notificationService: NotificationService) {
    notificationService.notificationObservable.subscribe((notification) => {
      this.notification = notification;
      this.onClose = notification.closeFunction;
      this.isError = notification.isError;
      if (notification.status) {
        this.getStatusCodeMessage(notification.status)
      }
    })
  }
  dismiss() {
    this.notification = undefined;
    this.notificationStatusMessage = undefined
    console.log(this.onClose);
    if (this.onClose) this.onClose();
  }

  getStatusCodeMessage(statusCode: number) {
    switch (statusCode) {
      case 200: {
        this.notificationStatusMessage = "Sucesso"
        break;
      }
      case 400: {
        this.notificationStatusMessage = "Request malformulado";
        break;
      }
      case 401: {
        this.notificationStatusMessage = "Não autorizado";
        break;
      }
      case 404: {
        this.notificationStatusMessage = "Não encontrado";
        break;
      }
    }
  }
}
