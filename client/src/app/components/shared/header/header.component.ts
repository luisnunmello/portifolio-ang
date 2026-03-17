import { Component } from '@angular/core';
import { ScrollService } from '../../../service/scroll/scroll.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
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
