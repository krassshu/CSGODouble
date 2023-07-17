import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/global-services/chat.service';
import { PlayerService } from 'src/app/global-services/player.service';
import { Player } from 'src/app/interface/player';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  @Input() receivedMessage: string = '';

  isLogin: boolean = false;
  token: string = '';
  conecting: string = '';
  conected: string = '';
  show: boolean = false;
  player: Player;
  chats: any[] = [];
  message: string = '';

  private subscription: Subscription = new Subscription();

  constructor(
    private playerService: PlayerService,
    private chatService: ChatService
  ) {
    this.player = playerService.player;
  }

  ngOnInit(): void {
    this.fakeLoad();
    this.playerService.isLogin$.subscribe((isLogin) => {
      this.isLogin = isLogin;
    });
    this.subscription.add(
      this.chatService.message$.subscribe((message) => {
        this.message = message;
        if (this.message) {
          this.addMessageToChat();
        }
      })
    );
  }

  fakeLoad() {
    if (this.isLogin) {
      setTimeout(() => {
        this.token = 'Generating authentication token...';
        setTimeout(() => {
          this.conecting = 'Connecting to server...';
          setTimeout(() => {
            this.conected = 'Conected!';
            setTimeout(() => {
              this.show = true;
            }, 200);
          }, 600);
        }, 300);
      }, 100);
    }
  }

  addMessageToChat() {
    this.chats.push({
      user: this.player.user,
      avatar: this.player.avatar,
      steam: this.player.steam,
      message: this.message,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
