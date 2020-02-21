import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { Battle } from '../models/battle';
import { Attack } from '../models/attack';
import { GameStatusEnum } from '../models/gameStatus';
import { Log } from '../models/log';
import { EventInfos } from '../models/eventInfos';
import { interval, Observable, Subscription, observable } from 'rxjs';
import { Stats } from '../models/stats';


@Injectable({
    providedIn: 'root'
})
export class GameService {

    public eventInfos: EventInfos = new EventInfos();

    public first: Pokemon;
    private second: Pokemon;
    private myTimer: unknown;
    private roundIsComplete: boolean = false;
    private isWin: boolean = false;

    constructor() {
    }

    startGame(pokemon1: Pokemon, pokemon2: Pokemon): void {

        this.eventInfos.winnerPokemonId = -1;
        this.eventInfos.logs.splice(0, this.eventInfos.logs.length);
        this.eventInfos.pokemon1 = pokemon1;
        this.eventInfos.pokemon2 = pokemon2;

        this.roundIsComplete = false;
        this.isWin = false;

        this.startBattle(new Battle(pokemon1, pokemon2));
    }

    private startBattle(battle: Battle): void {

        this.eventInfos.logs.push(new Log('Lancement du combat...'));

        this.first = battle.getFirstPokemonBattle();
        this.second = this.first === battle.pokemon1 ? battle.pokemon2 : battle.pokemon1;

        this.eventInfos.logs.push(new Log(`${this.first.name} commence en premier le combat.`));

        this.eventInfos.gameStatus = GameStatusEnum.Running;
        this.fight2();
    }

    private fight(observable: Subscription): void {

        if (this.eventInfos.gameStatus === GameStatusEnum.Paused) {
            this.eventInfos.gameStatus = GameStatusEnum.Paused;
            observable.unsubscribe();
            return;
        }

        let pokemon1: Pokemon = this.first;
        let pokemon2: Pokemon = this.second;
        this.eventInfos.pokemonIsAttacking = [false, false];

        // change pokemon position for the next round
        if (this.roundIsComplete) {
            pokemon1 = this.second;
            pokemon2 = this.first;
        }

        if (this.isWin) {

            this.eventInfos.logs.push(new Log(`${pokemon1.name} est ko.`, false));
            this.eventInfos.logs.push(new Log(`${pokemon2.name} gagne le combat.`));
            this.eventInfos.pokemonIsAttacking = [false, false];

            this.eventInfos.winnerPokemonId = pokemon2.id;
            this.eventInfos.gameStatus = GameStatusEnum.Stopped;
            observable.unsubscribe();
            return;
        }

        let dmgPoints = pokemon1.attackPokemon(pokemon2);
        this.eventInfos.logs.push(new Log(`${pokemon1.name} lance attaque ${pokemon1.attack.name} sur ${pokemon2.name}.`, true, dmgPoints));
        this.eventInfos.pokemonIsAttacking = [this.roundIsComplete ? false : true, this.roundIsComplete ? true : false];

        if (pokemon2.stats.health > 0) {
            this.eventInfos.logs.push(new Log(`Il reste ${pokemon2.stats.health} points de vie à ${pokemon2.name}.`));
        }
        else {
            this.isWin = true;
        }

        this.roundIsComplete = !this.roundIsComplete;
    }

    public resumeGame(): void {
        this.eventInfos.gameStatus = GameStatusEnum.Running;
        this.fight2();
    }

    private fight2() {
        // Create an Observable that will publish a value on an interval
        const observableCounter = interval(1000);

        // Subscribe to begin publishing values
        const observableSubscribed = observableCounter.subscribe(n => {
            this.fight(observableSubscribed);
        });

    }

}
