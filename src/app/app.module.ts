import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerInputComponent } from './player-input/player-input.component';
import { GameModeComponent } from './game-mode/game-mode.component';
import { GameComponent } from './game/game.component';
import { HotComponent } from './hot/hot.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerInputComponent,
    GameModeComponent,
    GameComponent,
    HotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
