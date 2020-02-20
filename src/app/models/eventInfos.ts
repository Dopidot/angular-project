import { Log } from '../models/log';
import { GameStatusEnum } from '../models/gameStatus';

export class EventInfos {
    public logs: Log[];
    public gameStatus: GameStatusEnum;
    public winnerPokemonId: number;

    constructor() {
        this.logs = [];
        this.gameStatus = GameStatusEnum.Stopped;
        this.winnerPokemonId = -1;
    }
}