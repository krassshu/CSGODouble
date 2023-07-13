import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PlayerService } from 'src/app/player.service';
import { Subscription } from 'rxjs';
import { RouletteService } from 'src/app/global-services/roulette.service';

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.scss'],
})
export class RoundsComponent implements OnInit, OnDestroy {
  @Input() betValue: number | undefined;
  @Output() placedBet = new EventEmitter<number>();
  @Output() winAmount = new EventEmitter<number>();
  @Output() placedBetHistorry = new EventEmitter<number>();

  player: any;
  betColor?: string;
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

  constructor(
    private playerService: PlayerService,
    private rouletteService: RouletteService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.rouletteService.rolling$.subscribe((rolling) => {
        this.rolling = rolling;
        if (!rolling) {
          this.resetBetArray();
        }
      })
    );
    this.subscription.add(
      this.rouletteService.currentNumber$.subscribe((currentNumber) => {
        this.currentNumber = currentNumber;
      })
    );

    this.player = this.playerService.player;
  }

  placeBet(color: string): string {
    this.placedBetValue = this.betValue !== undefined ? +this.betValue : 0;

    this.betArray[color] += this.placedBetValue;

    this.placedBetHistorry.emit(this.placedBetValue);

    console.log(
      `Your bet - red: ${this.betArray['red']}, green: ${this.betArray['green']}, black: ${this.betArray['black']}`
    );
    this.placedBet.emit(this.placedBetValue);
    return (this.betColor = color);
  }

  resetBetArray() {
    this.countWin();
    this.betArray = {
      red: 0,
      green: 0,
      black: 0,
    };
  }

  countWin() {
    let winBetAmount;
    if (this.currentNumber >= 1 && this.currentNumber <= 7) {
      winBetAmount = this.betArray['red'] * 2;
    } else if (this.currentNumber >= 8 && this.currentNumber <= 14) {
      winBetAmount = this.betArray['black'] * 2;
    } else {
      winBetAmount = this.betArray['green'] * 14;
    }
    this.winAmount.emit(winBetAmount);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
