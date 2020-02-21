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
  }

  addPokemonToSelectedPokemonList(pokemon: Pokemon) {

    if (this.selectedPokemons.length < 2) {
      this.selectedPokemons.push(pokemon);
      console.log(pokemon.id);
    }
  }

}
