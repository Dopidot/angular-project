import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { Attack } from '../models/attack';
import { Stats } from '../models/stats';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonApi } from './PokemonApi';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public pokemons: Array<Pokemon> = new Array<Pokemon>();
  public attack1: Attack = new Attack('éclair', 25, 0);
  public attack2: Attack = new Attack('coupe', 31, 0);
  public pokemonApi : PokemonApi;

  private baseUrl: string = "https://pokeapi.co/api/v2/";
  constructor(private http: HttpClient) {
    this.initPokemonList();
  }

  private initPokemonList() {


    const statsPikachu = new Stats(35, 90, 40, 50, 55, 50);
    const statsBulbizare = new Stats(45, 45, 49, 65, 49, 65);
    const statsAlakazam = new Stats(55, 120, 45, 95, 50, 135);
    const statsGalopa = new Stats(65, 105, 70, 80, 100, 80);
    const statsMewto = new Stats(106, 130, 90, 90, 110, 90);

    const pikachu = new Pokemon(0, 'pikachu', statsPikachu, 10, this.attack1,'');
    const bulbizarre = new Pokemon(1, 'bulbasaur', statsBulbizare, 10, this.attack2,'');
    const alakazam = new Pokemon(2, 'alakazam', statsAlakazam, 10, this.attack1,'');
    const galopa = new Pokemon(3, 'rapidash', statsGalopa, 10, this.attack2,'');
    const mewtwo = new Pokemon(4, 'mewtwo', statsMewto, 10, this.attack1,'');

    this.pokemons.push(pikachu, bulbizarre, alakazam, galopa, mewtwo);

  }

  public getAllPokemon(): Array<Pokemon> {
    return this.pokemons;
  }

  public getPokemonById(id: number): Pokemon {
    return this.pokemons[id];
  }

  // metod get stat


  public getPokemonByName(name: string) : Observable<PokemonApi> {
   return this.http.get<PokemonApi>(this.baseUrl + 'pokemon/' + name);
  }
}
