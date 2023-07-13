import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectedItemsService } from '../service/selected-items.service';
import { Item } from '../service/item.interface';
import { RouletteService } from 'src/app/global-services/roulette.service';

@Component({
  selector: 'app-deposit-items',
  templateUrl: './deposit-items.component.html',
  styleUrls: ['./deposit-items.component.scss'],
})
export class DepositItemsComponent implements OnInit, OnDestroy {
  selectedItems: Item[] = [];
  nonSelectedItems: number = 8;
  selectedItemsSubscribe: Subscription | undefined;
  credits: number = 0;

  constructor(
    private selectedItemsService: SelectedItemsService,
    private rouletteService: RouletteService
  ) {}

  ngOnInit(): void {
    this.selectedItemsSubscribe = this.selectedItemsService
      .getSelectedItemsSubject()
      .subscribe((selectedItems) => {
        this.selectedItems = selectedItems;
        this.credits = this.calculateTotalPrice();
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

  addBalance(credits: number): void {
    const selectedItems = [...this.selectedItems];
    this.selectedItemsService.setRemoveItemsAfterBalance(true);

    this.rouletteService.addBalance(credits);
    this.selectedItems = [];
    this.credits = 0;

    selectedItems.forEach((item) => {
      this.selectedItemsService.removeSelectedItem(item);
    });
  }

  ngOnDestroy(): void {
    if (this.selectedItemsSubscribe) {
      this.selectedItemsSubscribe.unsubscribe();
    }
  }
}
