import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private isLoginSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public isLogin$: Observable<boolean> = this.isLoginSubject.asObservable();
  player: any = {
    user: 'krashu',
    avatar: '../../../../../assets/img/csdouble_icon.png',
    balance: 1000000,
    steam: 'https://steamcommunity.com/profiles/76561198195833971/',
  };

  constructor() {}

  setIsLogin(isLogin: boolean): void {
    this.isLoginSubject.next(isLogin);
  }
}
