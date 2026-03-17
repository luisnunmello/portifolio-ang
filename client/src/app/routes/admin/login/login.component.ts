import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LoginService } from '../../../service/login/login.service';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AdminPageCardComponent } from "../../../components/admin-page-card/admin-page-card.component";

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, AdminPageCardComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild("passwordComponent") passwordComponent!: ElementRef<HTMLInputElement>;
  loggedIn?: boolean;
  loginForm = new FormGroup({
    password: new FormControl("")
  })

  constructor(private loginService: LoginService) {
    if (!loginService.loggedIn) {
      loginService.checkLogin().subscribe((value) => {
        this.loggedIn = value;
      })
    } else {
      this.loggedIn = loginService.loggedIn;
    }
  }

  doLogin() {
    this.loginService.doLogin(this.loginForm.value.password!).subscribe((res) => {
      this.loggedIn = res;
    });
  }
  doLogout() {
    this.loginService.doLogout().subscribe(() => {
      this.loggedIn = false;
    });
  }

  doChangePassword() {
    this.loginService.changePass(this.loginForm.value.password!).subscribe((res) => {
      console.log(res);
    });
  }
}
