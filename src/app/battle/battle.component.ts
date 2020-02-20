import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { GameStatusEnum } from '../models/gameStatus';
import { EventInfos } from '../models/eventInfos';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
    selector: 'app-battle',
    templateUrl: './battle.component.html',
    styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

    public pokemon1: Pokemon;
    public pokemon2: Pokemon;

    title = 'Pokemon';
    eventInfos: EventInfos;
    idPokemon1 : number;
    idPokemon2 : number;

    constructor(
        private gameService: GameService,
        private pokemonService: PokemonService,
        private router : ActivatedRoute
    ) { }

    ngOnInit(): void {
      //const listPokemonThatWillFight = this.pokemonService.getPokemonSelected();

      console.log("On regarde chacal");

      this.router.params
      .subscribe((params: Params): void => {
         this.idPokemon1 = Number(params.idP1);
         this.idPokemon2 = Number(params.idP2);

         console.log(this.idPokemon1);
         console.log(this.idPokemon2);
      });

      console.log("Après les params");

   
      this.pokemon1 = this.pokemonService.getPokemonById(this.idPokemon1);
      this.pokemon2 = this.pokemonService.getPokemonById(this.idPokemon2);

      console.log(this.pokemon1.name);
      console.log(this.pokemon2.name);

    }

    startGame(): void {
        this.eventInfos = this.gameService.eventInfos;
        this.gameService.startGame(this.pokemon1, this.pokemon2);

       // console.log("Liste des pokemons");
       // this.pokemonService.getAllPokemon();
    }

    pauseGame(): void {
        this.eventInfos.gameStatus = GameStatusEnum.Paused;
    }

    resumeGame(): void {
        this.gameService.resumeGame();
    }

}
