import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment';
import { type MessageType } from '../../model/messageModel';
import { RequestErrorHandlerService } from '../request-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient, private requestErrorHandlerService: RequestErrorHandlerService) { }

  public submitMessage(message: MessageType) {
    return this.httpClient.post<MessageType | string>(`${enviroment.urlBackend}/contact`, message, {observe: "response", });
  }
}
