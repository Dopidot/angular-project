import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { GameStatus, GameStatusEnum } from '../models/gameStatus';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = 'pokemon';
    messages: string[];
    game: Game = new Game();
    gameStatus: GameStatus = new GameStatus(GameStatusEnum.Stopped);

    startGame() : void {
        this.messages = this.game.messages;
        this.gameStatus = this.game.gameStatus;
        
        this.game.startGame();
    }

    pauseGame() : void {
        this.game.gameStatus.state = GameStatusEnum.Paused;
    }

    resumeGame() : void {
        this.game.resumeGame();
        this.gameStatus.state = GameStatusEnum.Running;
    }

}
