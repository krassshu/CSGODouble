import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  activePopup!: boolean;
  delayHide!: boolean;

  onActivePopup() {
    this.activePopup = true;
    this.delayHide = true;
  }
  onHidePopup() {
    this.delayHide = false;
    setTimeout(() => {
      this.activePopup = false;
    }, 500);
  }
}
