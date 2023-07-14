import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PlayerService } from 'src/app/global-services/player.service';
import { Subscription } from 'rxjs';
import { RouletteService } from 'src/app/global-services/roulette.service';

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.scss'],
})
export class RoundsComponent implements OnInit, OnDestroy {
  @Input() betValue: number | undefined;

  player: any;
  betColor!: string;
  placedBetValue: number = 0;
  rolling: boolean = false;
  currentNumber!: number;

  betArray: Record<string, number> = {
    red: 0,
    green: 0,
    black: 0,
  };
  private subscription: Subscription = new Subscription();
  rollingSubscription!: Subscription;
  currentNumberSubscription!: Subscription;
  isLogin: boolean = false;
  balance: number = 0;

  constructor(
    private playerService: PlayerService,
    private rouletteService: RouletteService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.rouletteService.rolling$.subscribe((rolling) => {
        this.rolling = rolling;
      })
    );
    this.subscription.add(
      this.rouletteService.currentNumber$.subscribe((currentNumber) => {
        this.currentNumber = currentNumber;
      })
    );
    this.subscription.add(
      this.playerService.isLogin$.subscribe((isLogin) => {
        this.isLogin = isLogin;
        if (isLogin) {
          this.subscription.add(
            this.rouletteService.balance$.subscribe((balance) => {
              this.balance = balance;
            })
          );
        }
      })
    );
    this.subscription.add(
      this.rouletteService.betArray$.subscribe((betArray) => {
        this.betArray = betArray;
      })
    );

    this.player = this.playerService.player;
  }

  placeBet(color: string): string {
    if (this.balance !== 0) {
      this.placedBetValue = this.betValue !== undefined ? +this.betValue : 0;

      this.betArray[color] += this.placedBetValue;

      console.log(
        `Your bet - red: ${this.betArray['red']}, green: ${this.betArray['green']}, black: ${this.betArray['black']}`
      );

      this.betColor = color;

      const newBalance = this.balance - this.placedBetValue;

      this.rouletteService.updateBalance(newBalance);
      this.rouletteService.updateBetArray(this.betArray);

      return this.betColor;
    }

    return '';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
