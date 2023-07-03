import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private players: string[] = [];
  private playerEmojis: { [key: string]: string } = {};

  constructor() {}

  setPlayers(players: string[]): void {
    this.players = players;
  }

  getPlayers(): string[] {
    return this.players;
  }

  getPlayerEmoji(player: string): string {
    return this.playerEmojis[player];
  }

  setPlayerEmoji(player: string, emoji: string): void {
    this.playerEmojis[player] = emoji;
  }
}
