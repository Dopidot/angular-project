export enum GameStatusEnum {
    Stopped = 'STOPPED',
    Running = 'RUNNING',
    Paused = 'PAUSED'
}

export class GameStatus {
    
    constructor(
        public state: GameStatusEnum
    ) {}
}