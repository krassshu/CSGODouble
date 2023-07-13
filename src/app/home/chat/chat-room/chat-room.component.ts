import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerService } from 'src/app/global-services/player.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  isLogin: boolean = false;
  token: string = '';
  conecting: string = '';
  conected: string = '';
  show: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.subscription = this.playerService.isLogin$.subscribe((isLogin) => {
      this.isLogin = isLogin;
      this.fakeLoad();
    });
  }

  fakeLoad() {
    setTimeout(() => {
      this.token = 'Generating authentication token...';
      setTimeout(() => {
        this.conecting = 'Connecting to server...';
        setTimeout(() => {
          this.conected = 'Conected!';
          setTimeout(() => {
            this.show = true;
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
