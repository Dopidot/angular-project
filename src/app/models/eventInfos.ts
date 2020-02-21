import { Log } from '../models/log';
import { GameStatusEnum } from '../models/gameStatus';
import { Pokemon } from './pokemon';

export class EventInfos {
    public logs: Log[];
    public gameStatus: GameStatusEnum;
    public winnerPokemonId: number;
    public pokemonIsAttacking: boolean[];
    public pokemon1: Pokemon;
    public pokemon2: Pokemon;

    constructor() {
        this.logs = [];
        this.gameStatus = GameStatusEnum.Stopped;
        this.winnerPokemonId = -1;
        this.pokemonIsAttacking = [false, false];
    }
}
