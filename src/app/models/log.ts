export class Log {

    constructor(
        public message: string,
        public damagePoints: unknown = null,
        public pokemonIsAlive: boolean = true
    ) {}
}