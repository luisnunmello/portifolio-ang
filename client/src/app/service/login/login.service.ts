import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environment';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loggedIn = signal(false);
  public isLoading = new BehaviorSubject(true);

  constructor(private httpClient: HttpClient) {
    this.checkLogin().subscribe();
  }

  checkLogin() {
    return this.httpClient.get<boolean>(`${environment.urlBackend}/auth/check`, {withCredentials: true}).pipe(tap((res) => {
      this.loggedIn.set(res);
      this.isLoading.next(false);
    }));
  }

  doLogin(password: string) {
    this.httpClient.post<boolean>(`${environment.urlBackend}/auth`, {password: password}, {withCredentials: true}).subscribe((res) => {
      this.loggedIn.set(true);
    });
  }

  doLogout() {
    this.httpClient.post<boolean>(`${environment.urlBackend}/auth/logout`, undefined, {withCredentials: true}).subscribe((res) => {
      this.loggedIn.set(false);
    });
  }

  changePass(newPassword: string) {
    return this.httpClient.post<boolean>(`${environment.urlBackend}/auth/changePass`, {password: newPassword}, {withCredentials: true});
  }
}
