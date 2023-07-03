import { Component, ElementRef, Renderer2, OnInit, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service'; // Importa el servicio GameService
import { Location } from '@angular/common';

@Component({
  selector: 'app-game-mode',
  templateUrl: './game-mode.component.html',
  styleUrls: ['./game-mode.component.scss']
})
export class GameModeComponent implements AfterViewInit {
  players: string[] = []; // Crea una propiedad para almacenar los jugadores
  contrastColor: 'black' | 'white' = 'white';
  emojis: string[] = ['🥳', '😎', '🤩', '😂', '🥴', '🤪', '💋', '💅', '🍻', '🚀', '🌟'];

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  getRandomEmoji(): string {
    return this.emojis[Math.floor(Math.random() * this.emojis.length)];
  }

  ngOnInit(): void {
    this.initializePlayerEmojis();
  }

  getPlayerEmoji(player: string): string {
    return this.gameService.getPlayerEmoji(player);
  }

  initializePlayerEmojis(): void {
    for (const player of this.players) {
      this.gameService.setPlayerEmoji(player, this.getRandomEmoji());
    }
  }

  constructor(private router: Router, private gameService: GameService, private location: Location, private renderer: Renderer2, private el: ElementRef) {
    this.players = this.gameService.getPlayers(); // Obtiene los jugadores del servicio
  }

  startSelectedMode() {
    this.router.navigate(['/game']);
  }

  startModeHot() {
    this.router.navigate(['/hot']);
  }

  openInstagram() {
    window.open('https://www.instagram.com/pontepedoclub/', '_blank');
  }

  goBack(): void {
    // Guarda la lista de jugadores en el GameService antes de navegar hacia atrás
    this.gameService.setPlayers(this.players);
    this.location.back();
  }

  setBackgroundColor(color: string): void {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }

  public isCard3Visible: boolean = false;

  toggleCard3Visibility() {
    this.isCard3Visible = !this.isCard3Visible;
  }


}
