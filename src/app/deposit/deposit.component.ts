import { Component, OnInit } from '@angular/core';
import { InventoryItemsService } from './service/inventory-items.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  loading: boolean = true;
  itemsAmount: number = 0;

  constructor(private inventoryItemsService: InventoryItemsService) {}

  ngOnInit(): void {
    this.itemsAmount = this.inventoryItemsService.items.length;
    this.fakeLoading();
  }

  fakeLoading() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
