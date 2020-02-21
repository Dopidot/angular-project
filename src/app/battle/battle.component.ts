import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { GameStatusEnum } from '../models/gameStatus';
import { EventInfos } from '../models/eventInfos';
import { ActivatedRoute, Params } from '@angular/router';

import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
    selector: 'app-battle',
    templateUrl: './battle.component.html',
    styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

    title = 'Pokemon';
    public pokemon1: Pokemon;
    public pokemon2: Pokemon;

    eventInfos: EventInfos;
    startDate: Date;
    idPokemon1: number;
    idPokemon2: number;

    constructor(
        private gameService: GameService,
        private pokemonService: PokemonService,
        private router: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.eventInfos = this.gameService.eventInfos;
        this.router.params
            .subscribe((params: Params): void => {
                this.idPokemon1 = Number(params.idP1);
                this.idPokemon2 = Number(params.idP2);
            });

        this.pokemon1 = this.pokemonService.getPokemonById(this.idPokemon1);
        this.pokemon2 = this.pokemonService.getPokemonById(this.idPokemon2);
    }

    startGame(): void {
        this.gameService.startGame(this.pokemon1, this.pokemon2);
        this.startDate = new Date();
    }

    pauseGame(): void {
        this.eventInfos.gameStatus = GameStatusEnum.Paused;
    }

    resumeGame(): void {
        this.gameService.resumeGame();
    }

}
