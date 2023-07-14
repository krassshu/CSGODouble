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
    new BehaviorSubject<number>(259);
  private spinAnimationSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  private rollHistorySubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(-1);
  private currentNumberSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(10);
  private rollingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private balanceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.playerService.player.balance
  );
  private currentPositionSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(259);
  private betArraySubject: BehaviorSubject<Record<string, number>> =
    new BehaviorSubject<Record<string, number>>({
      red: 0,
      green: 0,
      black: 0,
    });

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
  public currentPosition$: Observable<number> =
    this.currentPositionSubject.asObservable();
  public betArray$: Observable<Record<string, number>> =
    this.betArraySubject.asObservable();

  private progressTime: number = 45000;
  private rolling: boolean = false;
  private currentNumber: number = 10;
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
    const decreaseAmount = 100 / (this.progressTime / 100);

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
      this.currentPositionSubject.next(this.numberRanges[number]);
      const roulettePosition = scrollAmount - 11;
      this.roulettePositionSubject.next(scrollAmount - 11);
      console.log('Number: ' + number);
      setTimeout(() => {
        this.spinAnimationSubject.next(false);
        this.roulettePositionSubject.next(roulettePosition - 2760 * 4);
        this.rollHistorySubject.next(number);

        setTimeout(() => {
          this.rolling = false;
          this.resetBetArray();
          this.rollingSubject.next(false);
          this.progressSubject.next(100);
          this.progressTime = 45000;
          this.roundsSimulation();
        }, 1000);
      }, 6000);
    }
  }

  public updateCurrentNumber(number: number) {
    this.currentNumber = number;
    this.currentNumberSubject.next(number);
    console.log(number);
  }

  public addBalance(amount: number): void {
    const currentBalance = this.balanceSubject.getValue();
    const newBalance = currentBalance + amount;
    this.balanceSubject.next(newBalance);
  }

  public updateRoulettePosition(roulettePositionChange: number): void {
    this.roulettePositionSubject.next(roulettePositionChange);
    console.log('Roulette service ' + roulettePositionChange);
  }

  public updateBalance(newBalance: number): void {
    this.balanceSubject.next(newBalance);
  }

  public countWin() {
    const betArray = this.betArraySubject.getValue();
    let winBetAmount = 0;

    if (this.currentNumber >= 1 && this.currentNumber <= 7) {
      winBetAmount = betArray['red'] * 2;
    } else if (this.currentNumber >= 8 && this.currentNumber <= 14) {
      winBetAmount = betArray['black'] * 2;
    } else {
      winBetAmount = betArray['green'] * 14;
    }

    const currentBalance = this.balanceSubject.getValue();
    const newBalance = currentBalance + winBetAmount;
    console.log(newBalance);
    this.balanceSubject.next(newBalance);
  }

  public resetBetArray() {
    this.countWin();
    this.betArraySubject.next({
      red: 0,
      green: 0,
      black: 0,
    });
  }

  public updateBetArray(betArray: Record<string, number>): void {
    this.betArraySubject.next(betArray);
  }
}
