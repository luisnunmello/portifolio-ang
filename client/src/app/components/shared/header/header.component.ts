import { Component } from '@angular/core';
import { ScrollService } from '../../../service/scroll/scroll.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuToggled = false;

  constructor(private scrollService: ScrollService) {}

  public toggleMenu() {
    this.isMenuToggled = !this.isMenuToggled;
    this.reflectMenuOpenChanges();
  }

  public reflectMenuOpenChanges() {
    if (this.isMenuToggled) {
      // this.scrollService.lockScroll();
      return;
    }
    this.scrollService.unlockScroll();
  }
}
