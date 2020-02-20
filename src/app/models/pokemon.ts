import { Attack } from './attack';
import { Stats } from './stats';

export class Pokemon {

  constructor(
        public id: number,
        public name: string,
        public stats: Stats,
        public level: number,
        public attack: Attack
    ) { }

    attackPokemon(target: Pokemon): number {
      let damage =
      Math.floor(Math.floor(Math.floor( 2 * this.level / 5 + 2) * this.stats.attack * this.attack.power / target.stats.defense) / 50) + 2;

      if (target.stats.health - damage >= 0) {
          target.stats.health -= damage;
      } else {
        damage = target.stats.health;
        target.stats.health = 0;
      }

      return damage;
    }

}
