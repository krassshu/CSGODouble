import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { InventoryItemsService } from 'src/app/deposit/service/inventory-items.service';
import { Item } from 'src/app/deposit/service/item.interface';
import { SelectedItemsService } from 'src/app/deposit/service/selected-items.service';
import { PlayerService } from 'src/app/global-services/player.service';

@Component({
  selector: 'app-bot-inventory',
  templateUrl: './bot-inventory.component.html',
  styleUrls: ['./bot-inventory.component.scss'],
})
export class BotInventoryComponent {
  inventoryItems: Item[] = [];
  selectedItem: Item[] = [];
  selectedItemIndex: any[] = [];
  removeItemsAfterBalance: boolean = false;

  private selectedItemsSubscription: Subscription = new Subscription();

  constructor(
    private inventoryItemsService: InventoryItemsService,
    private selectedItemsService: SelectedItemsService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.inventoryItems = this.inventoryItemsService.items;
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
