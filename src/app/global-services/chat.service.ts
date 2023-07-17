import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messageSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  public message$: Observable<string> = this.messageSubject.asObservable();

  constructor() {}

  sendMessage(message: string): void {
    this.messageSubject.next(message);
  }
}
