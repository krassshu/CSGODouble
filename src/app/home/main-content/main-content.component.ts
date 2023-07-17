import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { RouletteService } from 'src/app/global-services/roulette.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit, OnDestroy {
  private resizeSubscription: Subscription;
  private lastComponentWidth: number;
  private currentPosition: number = 75;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private rouletteService: RouletteService
  ) {
    this.lastComponentWidth = this.elementRef.nativeElement.offsetWidth;
    this.resizeSubscription = fromEvent(window, 'resize').subscribe(() => {
      this.handleResize();
    });
  }

  ngOnInit(): void {
    this.rouletteService.currentPosition$.subscribe((currentPosition) => {
      this.currentPosition = currentPosition;
    });
  }

  handleResize(): void {
    const componentWidth = this.elementRef.nativeElement.offsetWidth;
    const windowWidth = window.innerWidth;

    if (componentWidth <= 1442) {
      const roulettePositionChange =
        this.currentPosition + (1443 - componentWidth) / 2;

      this.rouletteService.updateRoulettePosition(roulettePositionChange);
    } else if (this.lastComponentWidth <= 1442) {
      const roulettePositionChange =
        this.currentPosition + (1443 - componentWidth) / 2;

      this.rouletteService.updateRoulettePosition(roulettePositionChange);
    }

    this.lastComponentWidth = componentWidth;
  }
  ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
  }
}
