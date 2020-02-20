import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { Attack } from '../models/attack';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public pokemons: Array<Pokemon>;

  constructor() {
    this.initPokemonList();
  }

  private initPokemonList() {
    const fimbu = new Attack('Fimbu', 70);
    const attack1 = new Attack('éclair', 25);
    const attack2 = new Attack('coupe', 31);

    const pikachu = new Pokemon(1, 'Pikachu', 80, 10, 100, attack1, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png');
    const bulbizarre = new Pokemon(2, 'Bulbizarre', 50, 10, 100, attack2,
    'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png');
    const alakazam = new Pokemon(1, 'Alakazam', 40, 10, 100, fimbu, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/065.png');
    const galopa = new Pokemon(2, 'Galopa', 20, 10, 100, fimbu, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/078.png');
    const mewtwo = new Pokemon(3, 'Mewtwo' , 35 , 10, 100, fimbu, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png');

    this.pokemons = [pikachu, bulbizarre, alakazam, galopa, mewtwo];
  }

  public getAllPokemon(): Array<Pokemon> {
    return this.pokemons;
  }

  public getPokemonSelected(): Array<Pokemon> {
    return[this.pokemons[0], this.pokemons[1] ];
  }
}
