import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouletteService } from 'src/app/global-services/roulette.service';
import { Subscription } from 'rxjs';
import { PlayerService } from 'src/app/global-services/player.service';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.scss'],
})
export class BetsComponent implements OnInit, OnDestroy {
  balance: number = 0;
  betValue!: any;
  placedBetValue: number = 0;
  blockTyping: boolean = false;
  lastBet: number = 0;
  isLogin: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private rouletteService: RouletteService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.subscription = this.playerService.isLogin$.subscribe((isLogin) => {
      this.isLogin = isLogin;
      if (isLogin) {
        this.subscription.add(
          this.rouletteService.balance$.subscribe((balance) => {
            this.balance = balance;
            console.log(balance);
          })
        );
      }
    });
  }

  placeStatickBet(betValue: number, value: number) {
    if (this.isLogin) {
      if (betValue >= this.balance) {
        if (value === 0) {
          this.betValue = '';
        } else if (value === 0.5) {
          this.betValue = Math.floor((this.betValue || 0) / 2);
        } else {
          this.betValue = this.balance;
        }
      } else {
        if (value === 0) {
          this.betValue = '';
        } else if (value === -1) {
          this.betValue = this.lastBet;
        } else if (value >= 1 && value <= 1000) {
          this.betValue = (this.betValue || 0) + value;
        } else if (value === 0.5) {
          this.betValue = Math.floor((this.betValue || 0) / 2);
        } else if (value === 0.2) {
          this.betValue = (this.betValue || 0) * 2;
        } else {
          this.betValue = this.balance;
        }
      }
    }
  }
  changeCurrentBalance(placedBetValue: number) {
    if (this.balance >= placedBetValue) {
      this.balance = this.balance - placedBetValue;
    } else {
      return console.log('Not enought coin');
    }
  }

  checkBetValue(event: KeyboardEvent) {
    const inputValue = this.betValue;
    const keyPressed = event.key;

    if (!/^\d$/.test(keyPressed)) {
      event.preventDefault();
    } else {
      const newValue = parseInt(inputValue + keyPressed, 10);
      if (newValue >= this.balance) {
        event.preventDefault();
        this.betValue = this.balance.toString();
      }
    }
  }
  refreshBalance() {
    if (this.playerService.isLogin$) {
      this.balance;
    }
  }
  updatePlacedBetHistory(placedBetValue: number) {
    this.lastBet = placedBetValue;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
