import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pokemons: Array<Pokemon> = new Array<Pokemon>();
  public selectedPokemons: Array<Pokemon> = new Array<Pokemon>();
  public errorMessage: string;

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {

    this.pokemons = this.pokemonService.getAllPokemon();

    console.log(this.pokemons)
console.log("url");

for(let i= 0; i<this.pokemons.length;i++){
  this.pokemonService.getPokemonByName(this.pokemons[i].name)
  .subscribe(data => {
    this.pokemons[i].url = data.sprites.front_default;
  });

}

    

  }

  addPokemonToSelectedPokemonList(pokemon: Pokemon) {

    if (this.selectedPokemons.length < 2) {
      this.selectedPokemons.push(pokemon);
      console.log(pokemon.id);
    }
  }

}
