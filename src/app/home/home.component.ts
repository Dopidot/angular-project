import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { Attack } from '../models/attack';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pokemons: Array<Pokemon>;

  constructor() { }

  ngOnInit(): void {
    this.getInitPokemonList();
  }

  getInitPokemonList() : void {





    
    const fimbu = new Attack("Fimbu",70);
    const alakazam = new Pokemon(1,"Alakazam",40,10,80,fimbu,"https://assets.pokemon.com/assets/cms2/img/pokedex/full/065.png" );
    const galopa = new Pokemon(2,"Galopa",20,10,70,fimbu,"https://assets.pokemon.com/assets/cms2/img/pokedex/full/078.png" );
    const mewtwo = new Pokemon(2,"Mewtwo" , 35 , 10, 100,fimbu,"https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png");

    //this.pokemons.push(alakazam,galopa,mewtwo);3
    this.pokemons = [alakazam,galopa,mewtwo];

  }





  getAllPokemons() : Array<Pokemon>{
    return[this.pokemons[0] ,this.pokemons[1],this.pokemons[3],this.pokemons[4] ];
  }

  getPokemonSelected() : Array<Pokemon> {
    return[this.pokemons[1],this.pokemons[2] ];
  }

}
