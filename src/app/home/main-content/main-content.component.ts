import { Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { RouletteService } from 'src/app/global-services/roulette.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnDestroy {
  private resizeSubscription: Subscription;
  private lastComponentWidth: number;

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

  ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
  }

  handleResize(): void {
    const componentWidth = this.elementRef.nativeElement.offsetWidth;
    const windowWidth = window.innerWidth;

    if (componentWidth <= 1430) {
      const roulettePositionChange = (1430 - componentWidth) / 2 - (1430 - this.lastComponentWidth) / 2;
      this.rouletteService.updateRoulettePosition(roulettePositionChange);
    } else if (this.lastComponentWidth <= 1430) {
      this.rouletteService.updateRoulettePosition(-30);
    }

    this.lastComponentWidth = componentWidth;
  }
}
