import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/global-services/chat.service';
import { PlayerService } from 'src/app/global-services/player.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  selected = 'global';
  isActive: boolean = true;
  isHideChat: boolean = false;
  isLogin: boolean = false;
  chatClasses: string = '';
  messageText: string = '';

  constructor(
    private chatService: ChatService,
    private playerService: PlayerService
  ) {}
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.playerService.isLogin$.subscribe((isLogin) => {
        this.isLogin = isLogin;
      })
    );
  }

  toggleHide() {
    this.isHideChat = !this.isHideChat;
    this.isActive = !this.isHideChat;
    this.chatClasses = this.isHideChat ? 'hide-chat' : 'show-chat';
  }

  sendMessage(message: string): void {
    if (this.isLogin) {
      this.chatService.sendMessage(message);
      this.messageText = '';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
