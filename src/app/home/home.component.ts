import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pokemons: Array<Pokemon>;

  constructor(
    public pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.pokemons = this.pokemonService.getAllPokemon();
  }
}
