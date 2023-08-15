import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserComponent } from './navbar/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './home/chat/chat.component';
import { MainContentComponent } from './home/main-content/main-content.component';
import { RuletteComponent } from './home/main-content/roulette/roulette.component';
import { BetsComponent } from './home/main-content/bets/bets.component';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { MatSelectModule } from '@angular/material/select';
import { ChatRoomComponent } from './home/chat/chat-room/chat-room.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RoundsComponent } from './home/main-content/bets/rounds/rounds.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';

import { DepositComponent } from './deposit/deposit.component';
import { InventoryComponent } from './deposit/inventory/inventory.component';
import { DepositItemsComponent } from './deposit/deposit-items/deposit-items.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ProvablyFairComponent } from './provably-fair/provably-fair.component';
import { AffiliatesComponent } from './affiliates/affiliates.component';
import { SupportComponent } from './support/support.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './provably-fair/details/details.component';
import { RouletteService } from './global-services/roulette.service';
import { WithdrawItemsComponent } from './withdraw/withdraw-items/withdraw-items.component';
import { BotInventoryComponent } from './withdraw/bot-inventory/bot-inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    ChatComponent,
    MainContentComponent,
    RuletteComponent,
    BetsComponent,
    HomeComponent,
    ChatRoomComponent,
    RoundsComponent,
    FooterComponent,
    DepositComponent,
    InventoryComponent,
    DepositItemsComponent,
    WithdrawComponent,
    ProvablyFairComponent,
    AffiliatesComponent,
    SupportComponent,
    DetailsComponent,
    WithdrawItemsComponent,
    BotInventoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [RouletteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
