import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rulette',
  templateUrl: './rulette.component.html',
  styleUrls: ['./rulette.component.scss'],
})
export class RuletteComponent implements OnInit {
  progress: number = 100;
  progressTime: number = 30000;
  rollHistory: any[] = [1, 13, 12, 0, 11, 4, 8, 5, 6, 11];

  ballsClass: string = '';
  
  seconds: number = Math.floor(this.progressTime / 1000);
  milliseconds: number = this.progressTime % 1000;

  roulettePosition: number = 75;
  currentNumber: number = 11;

  numberRanges: { [key: string]: number } = {
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
  
  rolling: boolean = false;
  spinAnimation: boolean = true;

  ngOnInit(): void {
    this.roundsSimulation();
  }

  getBallsClass(number: number): string {
    if (number === 0) {
      return 'green';
    } else if (number >= 1 && number <= 7) {
      return 'red';
    } else {
      return 'dark';
    }
  }

  roundsSimulation() {
    this.rolling = false;
    this.spinAnimation = true;
    const decreaseAmount = 100 / (this.progressTime / 10);

    const intervalId = setInterval(() => {
      this.progress -= decreaseAmount;
      const remainingTime = Math.max(
        this.progressTime * (this.progress / 100),
        0
      );
      this.seconds = Math.floor(remainingTime / 1000);
      this.milliseconds = remainingTime % 1000;

      if (this.progress <= 0) {
        this.progress = 0;
        this.seconds = 0;
        this.milliseconds = 0;

        this.spinRoulette();
        clearInterval(intervalId);
      }
    }, 10);
  }

  spinRoulette() {
    if (this.rolling === false) {
      this.rolling = true;

      const number = Math.floor(Math.random() * 14);
      const scrollAmount =
        2760 * 4 + this.numberRanges[number] + this.currentNumber;
      this.roulettePosition = scrollAmount - 11;
      console.log('Number: ' + number);
      setTimeout(() => {
        this.spinAnimation = false;
        this.roulettePosition = this.roulettePosition - 2760 * 4;
        this.rollHistory.push(number);
        setTimeout(() => {
          this.progress = 100;
          this.progressTime = 30000;
          this.roundsSimulation();
        }, 1000);
      }, 6000);
    }
  }
}
