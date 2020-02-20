import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { GameStatusEnum } from '../models/gameStatus';
import { EventInfos } from '../models/eventInfos';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-battle',
    templateUrl: './battle.component.html',
    styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

    title = 'Pokemon';
    eventInfos: EventInfos;
    idPekomon1 : number;
    idPokemon2 : number;

    constructor(
        private gameService: GameService,
        private router: ActivatedRoute ) { }

    ngOnInit(): void {
        this.eventInfos = this.gameService.eventInfos;
        this.idPekomon1 = this.router.params['idP1'];
        this.idPokemon2 = this.router.params['idP2'];
    }

    startGame(): void {
        this.gameService.startGame();
    }

    pauseGame(): void {
        this.eventInfos.gameStatus = GameStatusEnum.Paused;
    }

    resumeGame(): void {
        this.gameService.resumeGame();
    }

}
