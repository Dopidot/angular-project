import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { Attack } from '../models/attack';
import { Router } from '@angular/router';

import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pokemons: Array<Pokemon> = new Array<Pokemon>();
  public selectedPokemons: Array<Pokemon> = new Array<Pokemon>();

  constructor(
    public pokemonService: PokemonService,private router: Router
  ) { }

  ngOnInit(): void {
    this.pokemons = this.pokemonService.getAllPokemon();
  }

  getInitPokemonList() : void {
    
    const fimbu = new Attack("Fimbu",70);
    const alakazam = new Pokemon(1,"Alakazam",40,10,80,fimbu,"https://assets.pokemon.com/assets/cms2/img/pokedex/full/065.png" );
    const galopa = new Pokemon(2,"Galopa",20,10,70,fimbu,"https://assets.pokemon.com/assets/cms2/img/pokedex/full/078.png" );
    const mewtwo = new Pokemon(3,"Mewtwo" , 35 , 10, 100,fimbu,"https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png");

    this.pokemons.push(alakazam,galopa,mewtwo);
  }

  getPokemonSelected(pokemon: Pokemon){

    if(this.selectedPokemons.length < 2){
      this.selectedPokemons.push(pokemon);
      console.log(pokemon.id);
    }
  }



}
