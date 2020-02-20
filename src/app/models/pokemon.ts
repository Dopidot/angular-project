import { Attack } from './attack';

export class Pokemon {
	
	constructor(
        public id: number,
        public name: string,
        public speed: number,
        public priorityMove: number,
        public health: number = 100,
        public attack: Attack
    ) { }

    attackPokemon(target: Pokemon) : number {
        let dmgPoints = this.attack.damage;

        if (target.health - dmgPoints >= 0) {
            target.health -= dmgPoints;
        } 
        else {
            dmgPoints = target.health;
            target.health = 0;
        }   

        return dmgPoints;
    }

}
