import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserComponent } from './navbar/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './home/chat/chat.component';
import { MainContentComponent } from './home/main-content/main-content.component';
import { RuletteComponent } from './home/main-content/rulette/rulette.component';
import { BetsComponent } from './home/main-content/bets/bets.component';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { MatSelectModule } from '@angular/material/select';
import { ChatRoomComponent } from './home/chat/chat-room/chat-room.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RoundsComponent } from './home/main-content/bets/rounds/rounds.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterComponent } from './footer/footer.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
