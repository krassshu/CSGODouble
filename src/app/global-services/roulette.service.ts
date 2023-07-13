import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root',
})
export class RouletteService {
  private progressSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(100);
  private secondsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  private millisecondsSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  private roulettePositionSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(75);
  private spinAnimationSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  private rollHistorySubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(-1);
  private currentNumberSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(11);
  private rollingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private balanceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.playerService.player.balance
  );

  public progress$: Observable<number> = this.progressSubject.asObservable();
  public seconds$: Observable<number> = this.secondsSubject.asObservable();
  public milliseconds$: Observable<number> =
    this.millisecondsSubject.asObservable();
  public roulettePosition$: Observable<number> =
    this.roulettePositionSubject.asObservable();
  public spinAnimation$: Observable<boolean> =
    this.spinAnimationSubject.asObservable();
  public rollHistory$: Observable<number> =
    this.rollHistorySubject.asObservable();
  public currentNumber$: Observable<number> =
    this.currentNumberSubject.asObservable();
  public rolling$: Observable<boolean> = this.rollingSubject.asObservable();
  public balance$: Observable<number> = this.balanceSubject.asObservable();

  private progressTime: number = 45000;
  private rolling: boolean = false;
  private currentNumber: number = 11;
  private roulettePosition: number = 75;
  private numberRanges: { [key: string]: number } = {
    '11': 75,
    '5': 167,
    '10': 259,
    '6': 351,
    '9': 443,
    '7': 535,
    '8': 629,
    '1': 719,
    '14': 811,
    '2': 903,
    '13': 994,
    '3': 1087,
    '12': 1177,
    '4': 1270,
    '0': 1362,
  };

  constructor(private playerService: PlayerService) {}

  roundsSimulation(): void {
    this.rolling = false;
    this.rollingSubject.next(false);
    this.spinAnimationSubject.next(true);
    const decreaseAmount = 100 / (this.progressTime / 10);

    const intervalId = setInterval(() => {
      const currentProgress = this.progressSubject.getValue();
      const remainingTime = Math.max(
        this.progressTime * (currentProgress / 100),
        0
      );
      const seconds = Math.floor(remainingTime / 1000);
      const milliseconds = remainingTime % 1000;

      if (currentProgress <= 0) {
        this.progressSubject.next(0);
        this.secondsSubject.next(0);
        this.millisecondsSubject.next(0);
        this.rolling = true;
        this.rollingSubject.next(true);

        this.spinRoulette();
        clearInterval(intervalId);
      } else {
        this.progressSubject.next(currentProgress - decreaseAmount);
        this.secondsSubject.next(seconds);
        this.millisecondsSubject.next(milliseconds);
      }
    }, 10);
  }

  spinRoulette(): void {
    if (this.rolling === true) {
      const number = Math.floor(Math.random() * 14);
      const scrollAmount =
        2760 * 4 + this.numberRanges[number] + this.currentNumber;
      const roulettePosition = scrollAmount - 11;
      this.roulettePositionSubject.next(scrollAmount - 11);
      console.log('Number: ' + number);
      setTimeout(() => {
        this.spinAnimationSubject.next(false);
        this.roulettePositionSubject.next(roulettePosition - 2760 * 4);
        this.rollHistorySubject.next(number);

        setTimeout(() => {
          this.rolling = false;
          this.rollingSubject.next(false);
          this.progressSubject.next(100);
          this.progressTime = 45000;
          this.roundsSimulation();
        }, 1000);
      }, 6000);
    }
  }
  updateCurrentNumber(number: number) {
    this.currentNumber = number;
    this.currentNumberSubject.next(number);
  }
  addBalance(amount: number): void {
    const currentBalance = this.balanceSubject.getValue();
    const newBalance = currentBalance + amount;
    this.balanceSubject.next(newBalance);
  }
  updateRoulettePosition(roulettePositionChange: number): void {
    this.roulettePosition += roulettePositionChange;
    this.roulettePositionSubject.next(this.roulettePosition);
  }
}
