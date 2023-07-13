import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  isLogin: boolean = false;

  
  player: any = {
    user: 'krashu',
    avatar: '../../../../../assets/img/csdouble_icon.png',
    balance: 1000000,
    steam: 'https://steamcommunity.com/profiles/76561198195833971/',
  };
  constructor() {}
}
