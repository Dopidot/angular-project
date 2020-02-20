import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { Battle } from '../models/battle';
import { Attack } from '../models/attack';
import { GameStatusEnum } from '../models/gameStatus';
import { Log } from '../models/log';
import { EventInfos } from '../models/eventInfos';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    public eventInfos: EventInfos = new EventInfos();

    private first: Pokemon;
    private second: Pokemon;
    private myTimer: any;

    constructor() { }

    startGame(pokemon1: Pokemon, pokemon2: Pokemon): void {
        this.initBattle(pokemon1, pokemon2);
    }

    private initBattle(pokemon1: Pokemon, pokemon2: Pokemon): void {

        this.eventInfos.winnerPokemonId = -1;
        this.eventInfos.logs.splice(0, this.eventInfos.logs.length);
        this.startBattle(new Battle(pokemon1, pokemon2));
    }

    private startBattle(battle: Battle): void {

        this.eventInfos.logs.push(new Log('Lancement du combat...'));

        this.first = battle.getFirstPokemonBattle();
        this.second = this.first === battle.pokemon1 ? battle.pokemon2 : battle.pokemon1;

        this.eventInfos.logs.push(new Log(`${this.first.name} commence en premier le combat.`));

        this.eventInfos.gameStatus = GameStatusEnum.Running;
        this.fight();
    }

    private fight(): void {

        this.myTimer = setInterval(function() {

            if (this.eventInfos.gameStatus === GameStatusEnum.Paused) {
                clearInterval(this.myTimer);
                this.eventInfos.gameStatus = GameStatusEnum.Paused;
                return;
            }

            this.eventInfos.logs.push(new Log(`${this.first.name} lance attaque ${this.first.attack.name} sur ${this.second.name}.`));
            this.first.attackPokemon(this.second);

            if (this.second.health > 0) {
                this.eventInfos.logs.push(new Log(`Il reste ${this.second.health} points de vie à ${this.second.name}.`));
            } else {
                this.eventInfos.logs.push(new Log(`${this.second.name} est KO.`, false));
                this.eventInfos.logs.push(new Log(`${this.first.name} gagne le combat.`));

                this.eventInfos.winnerPokemonId = this.first.id;
                this.eventInfos.gameStatus = GameStatusEnum.Stopped;
                clearInterval(this.myTimer);
            }

            // change pokemon position for the next fight
            const temp = this.first;
            this.first = this.second;
            this.second = temp;

        }.bind(this), 1000);
    }

    public resumeGame(): void {
        this.eventInfos.gameStatus = GameStatusEnum.Running;
        this.fight();
    }

}
