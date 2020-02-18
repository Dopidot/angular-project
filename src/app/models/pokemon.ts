import { Attack } from './attack';

export class Pokemon {
	
	constructor(
        public name: string,
        public speed: number,
        public priorityMove: number,
        public health: number = 100,
        public attack: Attack
    ) { }

    attackPokemon(target: Pokemon) : void {
        const nbAttack = this.attack.damage;

        if (target.health - nbAttack >= 0) {
            target.health -= nbAttack;
        } 
        else {
            target.health = 0;
        }   
    }

}
