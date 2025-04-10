import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment';
import { type MessageType } from '../../model/messageModel';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }

  public submitMessage(message: MessageType) {
    return this.httpClient.post(`${enviroment.urlBackend}/contact`, message);
  }
}
