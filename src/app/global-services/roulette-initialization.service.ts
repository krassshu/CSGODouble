import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouletteInitializationService {
  private isInitialized: boolean = false;

  setIsInitialized(value: boolean): void {
    this.isInitialized = value;
  }

  getIsInitialized(): boolean {
    return this.isInitialized;
  }
}
