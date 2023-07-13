import { Component, OnInit, OnDestroy } from '@angular/core';
import { InventoryItemsService } from '../service/inventory-items.service';
import { SelectedItemsService } from '../service/selected-items.service';
import { Subscription } from 'rxjs';
import { Item } from '../service/item.interface';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit, OnDestroy {
  inventoryItems: Item[] = this.inventoryItemsService.items;
  selectedItem: Item[] = [];
  selectedItemIndex: any[] = [];
  selectedItemsSubscription!: Subscription;
  removeItemsAfterBalance: boolean = false;

  constructor(
    private inventoryItemsService: InventoryItemsService,
    private selectedItemsService: SelectedItemsService
  ) {}

  ngOnInit(): void {
    this.selectedItemsSubscription = this.selectedItemsService
      .getSelectedItemsSubject()
      .subscribe((selectedItems) => {
        this.selectedItem = selectedItems;
        this.updateSelectedItemIndex();
      });

    this.selectedItemsSubscription = this.selectedItemsService
      .getRemoveItemsSubject()
      .subscribe(() => {
        if (this.selectedItemsService.shouldRemoveItemsAfterBalance()) {
          this.removeSelectedItems();
          this.selectedItemsService.setRemoveItemsAfterBalance(false);
        }
      });
  }

  selectItem(item: any, index: number): void {
    if (!this.selectedItemIndex.includes(index)) {
      this.selectedItemsService.addSelectedItem(item);
      this.selectedItemIndex.push(index);
    }
  }

  updateSelectedItemIndex(): void {
    this.selectedItemIndex = [];
    for (let i = 0; i < this.selectedItem.length; i++) {
      const item = this.selectedItem[i];
      const index = this.inventoryItems.findIndex(
        (inventoryItem) => inventoryItem === item
      );
      if (index !== -1) {
        this.selectedItemIndex.push(index);
      }
    }
  }

  removeSelectedItems(): void {
    for (const item of this.selectedItem) {
      const index = this.inventoryItems.findIndex(
        (inventoryItem) => inventoryItem === item
      );
      if (index !== -1) {
        this.inventoryItems.splice(index, 1);
      }
    }
    this.selectedItem = [];
    this.updateSelectedItemIndex();
  }
  ngOnDestroy(): void {
    this.selectedItemsSubscription.unsubscribe();
  }
}