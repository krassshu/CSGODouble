import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouletteHistoryService } from 'src/app/global-services/roulette-history.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  rollsHistory: any[] = [];
  numbers: any[] = [];
  convertedNumbers: any[] = [];
  rounds: number = 0;

  constructor(
    private route: ActivatedRoute,
    private rouletteHistoryService: RouletteHistoryService
  ) {}
  ngOnInit(): void {
    const lottery = this.route.snapshot.paramMap.get('lottery');
    this.rollsHistory = this.rouletteHistoryService.rouletteHistory.find(
      (el) => {
        return el.lottery == lottery;
      }
    );

    this.prepareArray();
  }

  prepareArray() {
    this.numbers = Object.values(this.rollsHistory)[4];
    this.rounds =
      Object.values(this.rollsHistory)[3] -
      Object.values(this.rollsHistory)[4].length;

    for (let i = 0; i < this.numbers.length / 10; i++) {
      this.convertedNumbers.push(this.numbers.slice(i * 10, (i + 1) * 10));
    }
  }

  getBallsClass(number: number): string {
    if (number === 0) {
      return 'green';
    } else if (number >= 1 && number <= 7) {
      return 'red';
    } else if (number >= 8 && number <= 14) {
      return 'dark';
    } else {
      return '';
    }
  }
  getCurrentTime(index: number, data: any[]): string {
    const currentTime = new Date();
    const minutesToAdd = data.length < 10 ? 12 : 0;
    const minutesToSubtract =
      (this.convertedNumbers.length - index - 1) * 12 + minutesToAdd;
    currentTime.setMinutes(currentTime.getMinutes() - minutesToSubtract);

    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    return currentTime.toLocaleString(undefined, options);
  }
}
