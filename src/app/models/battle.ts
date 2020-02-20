import { Pokemon } from './pokemon';

export class Battle {

    constructor(
        public pokemon1: Pokemon,
        public pokemon2: Pokemon,
    ) {}

    getFirstPokemonBattle(random = Math.random()): Pokemon {

        if (this.pokemon1.stats.speed - this.pokemon2.stats.speed !== 0) {
            return this.pokemon1.stats.speed > this.pokemon2.stats.speed ? this.pokemon1 : this.pokemon2;
        }

        if (this.pokemon1.attack.priority - this.pokemon2.attack.priority !== 0) {
            return this.pokemon1.attack.priority > this.pokemon2.attack.priority ? this.pokemon1 : this.pokemon2;
        }

        return random <= 0.5 ? this.pokemon1 : this.pokemon2;
    }
}
