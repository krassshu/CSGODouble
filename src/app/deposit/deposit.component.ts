import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerService } from '../global-services/player.service';
import { InventoryItemsService } from './service/inventory-items.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  loading: boolean = true;
  itemsAmount: number = 0;
  isLogin: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private inventoryItemsService: InventoryItemsService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.subscription = this.playerService.isLogin$.subscribe((isLogin) => {
      this.isLogin = isLogin;
    });

    this.itemsAmount = this.inventoryItemsService.items.length;
    this.fakeLoading();
  }

  fakeLoading() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
