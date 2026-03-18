import { Component, ElementRef, Input, Signal, ViewChild, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AdminPageCardComponent } from '../../components/admin/admin-page-card/admin-page-card.component';
import { LoginService } from '../../service/login/login.service';
import { NotificationService } from '../../service/notification/notification.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, AdminPageCardComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  @ViewChild("passwordComponent") passwordComponent!: ElementRef<HTMLInputElement>;
  loggedIn!: WritableSignal<boolean>;
  loginForm = new FormGroup({
    password: new FormControl("")
  })

  constructor(private loginService: LoginService, private notificationService: NotificationService) {
    this.loggedIn = loginService.loggedIn;
    console.log(loginService.loggedIn());
  }

  doLogin() {
    this.loginService.doLogin(this.loginForm.value.password!);
  }
  doLogout() {
    this.loginService.doLogout();
  }

  doChangePassword() {
    this.loginService.changePass(this.loginForm.value.password!).subscribe((res) => {
      this.notificationService.show({title: "Senha alterada", description: "Senha alterada com sucesso."});
    });
  }
}
