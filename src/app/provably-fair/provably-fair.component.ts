import { Component, OnInit } from '@angular/core';
import { RouletteHistoryService } from '../global-services/roulette-history.service';

@Component({
  selector: 'app-provably-fair',
  templateUrl: './provably-fair.component.html',
  styleUrls: ['./provably-fair.component.scss'],
})
export class ProvablyFairComponent implements OnInit {
  rouletteHistory: any[] = [];

  constructor(private rouletteHistoryService: RouletteHistoryService) {}
  ngOnInit(): void {
    this.rouletteHistory = this.rouletteHistoryService.rouletteHistory.reverse();
  }
}
