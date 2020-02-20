import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { Attack } from '../models/attack';
import { Stats } from '../models/stats';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public pokemons: Array<Pokemon> = new Array<Pokemon>();

  constructor() {
    this.initPokemonList();
  }

  private initPokemonList() {
    const attack1 = new Attack('éclair', 25, 0);
    const attack2 = new Attack('coupe', 31, 0);

    const statsPikachu = new Stats(35, 90, 40, 50, 55, 50);
    const statsBulbizare = new Stats(45, 45, 49, 65, 49, 65);
    const statsAlakazam = new Stats(55, 120, 45, 95, 50, 135);
    const statsGalopa = new Stats(65, 105, 70, 80, 100, 80);
    const statsMewto = new Stats(106, 130, 90, 90, 110, 90);

    const pikachu = new Pokemon(0, 'Pikachu', statsPikachu, 10, attack1,
      'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png');
    const bulbizarre = new Pokemon(1, 'Bulbizarre', statsBulbizare, 10, attack2,
      'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png');
    const alakazam = new Pokemon(2, 'Alakazam', statsAlakazam, 10, attack1,
      'https://assets.pokemon.com/assets/cms2/img/pokedex/full/065.png');
    const galopa = new Pokemon(3, 'Galopa', statsGalopa, 10, attack2,
      'https://assets.pokemon.com/assets/cms2/img/pokedex/full/078.png');
    const mewtwo = new Pokemon(4, 'Mewtwo', statsMewto, 10, attack1,
      'https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png');

    this.pokemons.push(pikachu, bulbizarre, alakazam, galopa, mewtwo);
  }

  public getAllPokemon(): Array<Pokemon> {
    return this.pokemons;
  }

  public getPokemonById(id: number): Pokemon {
    return this.pokemons[id];
  }

  public getAll() {
    for (let i = 0; i <= this.pokemons.length; i++) {
      console.log(this.pokemons[i].id + ' - ' + this.pokemons[i].name);
    }
  }
}
