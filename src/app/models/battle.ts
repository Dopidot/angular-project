import { Pokemon } from './pokemon';

export class Battle {

	constructor(
        public pokemon1: Pokemon,
        public pokemon2: Pokemon,
    ) {
    }

    getFirstPokemonBattle(random = Math.random()) : Pokemon {

        if (this.pokemon1.speed - this.pokemon2.speed !== 0) {
            return this.pokemon1.speed > this.pokemon2.speed ? this.pokemon1 : this.pokemon2;
        }

        if (this.pokemon1.priorityMove - this.pokemon2.priorityMove !== 0) {
            return this.pokemon1.priorityMove > this.pokemon2.priorityMove ? this.pokemon1 : this.pokemon2;
        }
        
        return random <= 0.5 ? this.pokemon1 : this.pokemon2; 
    }

    
}
