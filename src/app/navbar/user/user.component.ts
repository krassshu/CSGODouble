import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerService } from 'src/app/global-services/player.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  isDropdownActive: boolean = false;
  player: any;
  isLogin: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.player = this.playerService.player;

    this.subscription.add(
      this.playerService.isLogin$.subscribe((isLogin) => {
        this.isLogin = isLogin;
      })
    );
  }

  toggleDropdown(): void {
    this.isDropdownActive = !this.isDropdownActive;
  }

  onLogin() {
    this.isLogin = true;
    this.playerService.setIsLogin(true);
  }

  onLogout() {
    this.isLogin = false;
    this.playerService.setIsLogin(false);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
