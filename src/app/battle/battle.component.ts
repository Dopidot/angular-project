import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { GameStatus, GameStatusEnum } from '../models/gameStatus';

@Component({
    selector: 'app-battle',
    templateUrl: './battle.component.html',
    styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

    constructor(
        private gameService: GameService
    ) { }

    ngOnInit(): void {
    }

    title = 'pokemon';
    messages: string[];
    gameStatus: GameStatus = new GameStatus(GameStatusEnum.Stopped);

    startGame(): void {
        this.messages = this.gameService.messages;
        this.gameStatus = this.gameService.gameStatus;

        this.gameService.startGame();
    }

    pauseGame(): void {
        this.gameService.gameStatus.state = GameStatusEnum.Paused;
    }

    resumeGame(): void {
        this.gameService.resumeGame();
        this.gameStatus.state = GameStatusEnum.Running;
    }

}
