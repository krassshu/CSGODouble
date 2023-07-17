import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../../interface/item.interface';

@Injectable({
  providedIn: 'root',
})
export class SelectedItemsService {
  selectedItems: Item[] = [];
  selectedItemsSubject: Subject<Item[]> = new Subject<Item[]>();
  removeItemsAfterBalance: boolean = false;
  removeItemsSubject: Subject<void> = new Subject<void>(); // Nowe zdarzenie

  getSelectedItems() {
    return this.selectedItems;
  }

  addSelectedItem(item: Item) {
    this.selectedItems.push(item);
    this.selectedItemsSubject.next(this.selectedItems);
  }

  removeSelectedItem(item: Item) {
    const index = this.selectedItems.indexOf(item);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
      this.selectedItemsSubject.next(this.selectedItems);
    }
  }

  getSelectedItemsSubject(): Subject<Item[]> {
    return this.selectedItemsSubject;
  }

  setRemoveItemsAfterBalance(shouldRemove: boolean): void {
    this.removeItemsAfterBalance = shouldRemove;
    if (shouldRemove) {
      this.removeItemsSubject.next(); 
    }
  }

  shouldRemoveItemsAfterBalance(): boolean {
    return this.removeItemsAfterBalance;
  }

  getRemoveItemsSubject(): Subject<void> {
    return this.removeItemsSubject;
  }
}
