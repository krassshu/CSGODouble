import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { InventoryItemsService } from '../deposit/service/inventory-items.service';
import { PlayerService } from '../global-services/player.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
})
export class WithdrawComponent {
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
