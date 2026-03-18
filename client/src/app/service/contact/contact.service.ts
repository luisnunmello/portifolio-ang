import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment';
import { type Message } from '../../types/message.type';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }

  public submitMessage(message: Message) {
    return this.httpClient.post<Message | string>(`${enviroment.urlBackend}/contact`, message, {observe: "response", });
  }
}
