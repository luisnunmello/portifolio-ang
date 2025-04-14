import { Injectable } from '@angular/core';
import { NotificationService } from './notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestErrorHandlerService {

  constructor(private notificationService: NotificationService) {

  }

  handleRequestError(error: HttpErrorResponse) {
    console.log(error);
    this.notificationService.show({title: "Erro", description: error.message, status: error.status})
  }
}
