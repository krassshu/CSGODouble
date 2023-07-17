import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/interface/item.interface';
import { SelectedItemsService } from 'src/app/deposit/service/selected-items.service';
import { RouletteService } from 'src/app/global-services/roulette.service';
import { PlayerService } from 'src/app/global-services/player.service';

@Component({
  selector: 'app-withdraw-items',
  templateUrl: './withdraw-items.component.html',
  styleUrls: ['./withdraw-items.component.scss'],
})
export class WithdrawItemsComponent {
  selectedItems: Item[] = [];
  nonSelectedItems: number = 8;
  selectedItemsSubscribe: Subscription | undefined;
  credits: number = 0;
  balance: number = 0;
  isLogin: boolean = false;

  constructor(
    private selectedItemsService: SelectedItemsService,
    private rouletteService: RouletteService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.selectedItemsSubscribe = this.selectedItemsService
      .getSelectedItemsSubject()
      .subscribe((selectedItems) => {
        this.selectedItems = selectedItems;
        this.credits = this.calculateTotalPrice();
      });
    this.rouletteService.balance$.subscribe((balance) => {
      this.balance = balance;
    });
    this.playerService.isLogin$.subscribe((isLogin) => {
      this.isLogin = isLogin;
    });
  }

  calculateTotalPrice(): number {
    return this.selectedItems.reduce((total, item) => {
      return total + item.price * 10;
    }, 0);
  }

  getRange(value: number) {
    value = this.nonSelectedItems - this.selectedItems.length;
    return Array.from({ length: value });
  }

  removeSelectedItem(item: any) {
    this.credits = this.credits - item.price * 10;
    this.selectedItemsService.removeSelectedItem(item);
  }

  reduceBalance(credits: number): void {
    if (this.isLogin) {
      const selectedItems = [...this.selectedItems];
      this.selectedItemsService.setRemoveItemsAfterBalance(true);

      this.rouletteService.reduceBalance(credits);
      this.selectedItems = [];
      this.credits = 0;

      selectedItems.forEach((item) => {
        this.selectedItemsService.removeSelectedItem(item);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.selectedItemsSubscribe) {
      this.selectedItemsSubscribe.unsubscribe();
    }
  }
}
