import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';

@Injectable({
    providedIn: 'root'
})
export class BattleService {

    constructor( ) { }

    public getFirstPokemonBattle(pokemon1: Pokemon, pokemon2: Pokemon, random = Math.random()): Pokemon {

        if (pokemon1.stats.speed - pokemon2.stats.speed !== 0) {
            return pokemon1.stats.speed > pokemon2.stats.speed ? pokemon1 : pokemon2;
        }

        if (pokemon1.attack.priority - pokemon2.attack.priority !== 0) {
            return pokemon1.attack.priority > pokemon2.attack.priority ? pokemon1 : pokemon2;
        }

        return random <= 0.5 ? pokemon1 : pokemon2;
    }

    public attackPokemon(source: Pokemon, target: Pokemon): number {
        let damage =
            Math.floor(Math.floor(Math.floor(2 * source.level / 5 + 2) * source.stats.attack * source.attack.power / target.stats.defense) / 50) + 2;

        if (target.stats.health - damage >= 0) {
            target.stats.health -= damage;
        } else {
            damage = target.stats.health;
            target.stats.health = 0;
        }

        return damage;
    }
}
