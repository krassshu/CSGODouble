import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  selected = 'global';
  isActive: boolean = true;
  isHideChat: boolean = false;
  chatClasses: string = '';

  toggleHide() {
    this.isHideChat = !this.isHideChat;
    this.isActive = !this.isHideChat;
    this.chatClasses = this.isHideChat ? 'hide-chat' : 'show-chat';
  }
}
