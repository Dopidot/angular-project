import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { GameStatusEnum } from '../models/gameStatus';
import { EventInfos } from '../models/eventInfos';
import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
    selector: 'app-battle',
    templateUrl: './battle.component.html',
    styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

    private pokemon1: Pokemon;
    private pokemon2: Pokemon;

    title = 'Pokemon';
    eventInfos: EventInfos = new EventInfos();

    constructor(
        private gameService: GameService,
        private pokemonService: PokemonService
    ) { }

    ngOnInit(): void {
      const listPokemonThatWillFight = this.pokemonService.getPokemonSelected();
      this.pokemon1 = listPokemonThatWillFight[0];
      this.pokemon2 = listPokemonThatWillFight[1];
    }

    startGame(): void {
        this.eventInfos = this.gameService.eventInfos;
        this.gameService.startGame(this.pokemon1, this.pokemon2);
    }

    pauseGame(): void {
        this.eventInfos.gameStatus = GameStatusEnum.Paused;
    }

    resumeGame(): void {
        this.gameService.resumeGame();
    }

}
