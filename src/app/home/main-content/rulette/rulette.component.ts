import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouletteHistoryService } from 'src/app/global-services/roulette-history.service';
import { RouletteInitializationService } from 'src/app/global-services/roulette-initialization.service';
import { RouletteService } from 'src/app/global-services/roulette.service';

@Component({
  selector: 'app-rulette',
  templateUrl: './rulette.component.html',
  styleUrls: ['./rulette.component.scss'],
})
export class RuletteComponent implements OnInit, OnDestroy {
  progress: number = 100;
  seconds: number = 0;
  milliseconds: number = 0;
  roulettePosition: number = 0;
  spinAnimation: boolean = true;
  rollHistory: any[] = [];

  private subscription: Subscription = new Subscription();

  constructor(
    private rouletteService: RouletteService,
    private rouletteHistoryService: RouletteHistoryService,
    private rouletteInitializationService: RouletteInitializationService
  ) {}

  ngOnInit(): void {
    const isInitialized = this.rouletteInitializationService.getIsInitialized();

    this.subscription.add(
      this.rouletteService.roulettePosition$.subscribe((roulettePosition) => {
        this.roulettePosition = roulettePosition;
      })
    );
    this.subscription.add(
      this.rouletteService.progress$.subscribe((progress) => {
        this.progress = progress;
      })
    );
    this.subscription.add(
      this.rouletteService.seconds$.subscribe((seconds) => {
        this.seconds = seconds;
      })
    );

    this.subscription.add(
      this.rouletteService.milliseconds$.subscribe((milliseconds) => {
        this.milliseconds = milliseconds;
      })
    );
    this.subscription.add(
      this.rouletteService.spinAnimation$.subscribe((spinAnimation) => {
        this.spinAnimation = spinAnimation;
      })
    );

    this.subscription.add(
      this.rouletteService.rollHistory$.subscribe((currentNumber) => {
        if (currentNumber !== -1) {
          this.rollHistory.push(currentNumber);
        }
      })
    );
    this.rollHistory = this.rouletteHistoryService.rollHistory;

    if (!isInitialized) {
      this.rouletteService.roundsSimulation();
      this.rouletteService.spinRoulette();

      this.rouletteInitializationService.setIsInitialized(true);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
}
