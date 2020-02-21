import { Attack } from './attack';
import { Stats } from './stats';

export class Pokemon {

  constructor(
    public id: number,
    public name: string,
    public stats: Stats,
    public level: number,
    public attack: Attack,
    public url: string
  ) { }

}
