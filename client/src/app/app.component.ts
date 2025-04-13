import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AlertComponent } from "./components/alert/alert.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portifolio';

  constructor(private translate: TranslateService) {
    // this.translate.setDefaultLang("pt");

  }

  public t(str: string) {
    return this.translate.instant(`Index.${str}`);
  }
}
