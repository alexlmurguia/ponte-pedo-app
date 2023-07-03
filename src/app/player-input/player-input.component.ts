import { Component, Renderer2, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-player-input',
  templateUrl: './player-input.component.html',
  styleUrls: ['./player-input.component.scss']
})
export class PlayerInputComponent implements OnInit, OnDestroy {
  playerName: string = '';
  players: string[] = [];
  showErrorMessage: boolean = false;

  constructor(
    private router: Router,
    private gameService: GameService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {this.players = gameService.getPlayers();}

  ngOnInit() {
    this.renderer.addClass(document.body, 'animated-background');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'animated-background');
  }

  addPlayer() {
    if (this.playerName.trim()) {
      this.players.push(this.playerName.trim());
      this.playerName = '';
      if (this.players.length >= 1) {
        this.showErrorMessage = false;
      }
    }
  }

  startGame() {
    if (this.players.length >= 1) {
      this.gameService.setPlayers(this.players);
      this.router.navigate(['/game-mode']);
    } else {
      this.showErrorMessage = true;
    }
  }

  removePlayer(player: string) {
    const index = this.players.indexOf(player);
    if (index > -1) {
      this.players.splice(index, 1);
    }
  }
  
}
