import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/player.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  isDropdownActive: boolean = false;
  player: any;
  isLogin: boolean = false;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.player = this.playerService.player;
  }

  toggleDropdown(): void {
    this.isDropdownActive = !this.isDropdownActive;
  }
  onLogin() {
    this.isLogin = true;
  }
  onLogout() {
    this.isLogin = false;
  }
}
