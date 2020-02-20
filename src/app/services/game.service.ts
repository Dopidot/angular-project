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

    private pokemon1: Pokemon;
    private pokemon2: Pokemon;
    private myTimer: unknown;

    constructor() { }

    startGame(): void {
        this.initBattle();
    }

    private initBattle() : void {
        const initialHealth = 100;
        const attack1 = new Attack('éclair', 25);
        const attack2 = new Attack('coupe', 31);

        const pokemon1 = new Pokemon(1, 'Pikachu', 80, 10, initialHealth, attack1);
        const pokemon2 = new Pokemon(2, 'Bulbizarre', 50, 10, initialHealth, attack2);

        this.eventInfos.winnerPokemonId = -1;
        this.eventInfos.logs.splice(0, this.eventInfos.logs.length);

        this.startBattle(new Battle(pokemon1, pokemon2));
    }

    private startBattle(battle: Battle) : void {

        this.eventInfos.logs.push(new Log('Lancement du combat...'));

        this.pokemon1 = battle.getFirstPokemonBattle();
        this.pokemon2 = this.pokemon1 === battle.pokemon1 ? battle.pokemon2 : battle.pokemon1;

        this.eventInfos.logs.push(new Log(`${this.pokemon1.name} commence en premier le combat.`));

        this.eventInfos.gameStatus = GameStatusEnum.Running;
        this.fight();
    }

    private fight(): void {

        this.myTimer = setInterval(function () {

            if (this.eventInfos.gameStatus === GameStatusEnum.Paused) {
                clearInterval(this.myTimer);
                this.eventInfos.gameStatus = GameStatusEnum.Paused;
                return;
            }

            let dmgPoints = this.pokemon1.attackPokemon(this.pokemon2);
            this.eventInfos.logs.push(new Log(`${this.pokemon1.name} lance attaque ${this.pokemon1.attack.name} sur ${this.pokemon2.name}.`, true, dmgPoints));

            if (this.pokemon2.health > 0) {
                this.eventInfos.logs.push(new Log(`Il reste ${this.pokemon2.health} points de vie à ${this.pokemon2.name}.`));
            }
            else {
                this.eventInfos.logs.push(new Log(`${this.pokemon2.name} est ko.`, false));
                this.eventInfos.logs.push(new Log(`${this.pokemon1.name} gagne le combat.`));

                this.eventInfos.winnerPokemonId = this.pokemon1.id;
                this.eventInfos.gameStatus = GameStatusEnum.Stopped;
                clearInterval(this.myTimer);
            }

            // change pokemon position for the next fight
            let temp = this.pokemon1;
            this.pokemon1 = this.pokemon2;
            this.pokemon2 = temp;

        }.bind(this), 1000);
    }

    public resumeGame(): void {
        this.eventInfos.gameStatus = GameStatusEnum.Running;
        this.fight();
    }

}
