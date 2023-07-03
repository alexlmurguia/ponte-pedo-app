import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerInputComponent } from './player-input/player-input.component';
import { GameModeComponent } from './game-mode/game-mode.component';
import { GameComponent } from './game/game.component';
import { HotComponent } from './hot/hot.component';

const routes: Routes = [
  { path: '', redirectTo: '/player-input', pathMatch:'full' },
  { path: 'player-input', component: PlayerInputComponent },
  { path: 'game-mode', component: GameModeComponent },
  { path: 'game', component: GameComponent },
  { path: 'hot', component: HotComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
