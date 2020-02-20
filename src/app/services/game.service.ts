import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { Battle } from '../models/battle';
import { Attack } from '../models/attack';
import { GameStatusEnum } from '../models/gameStatus';
import { Log } from '../models/log';
import { EventInfos } from '../models/eventInfos';
import { interval, Observable, Subscription, observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    public eventInfos: EventInfos = new EventInfos();

    private pokemon1: Pokemon;
    private pokemon2: Pokemon;
    private myTimer: unknown;
    private roundIsComplete: boolean = false;
    private isWin: boolean = false;

    constructor() {
    }

    startGame(): void {
        const initialHealth = 100;
        const attack1 = new Attack('éclair', 25);
        const attack2 = new Attack('coupe', 31);

        const pokemon1 = new Pokemon(1, 'Pikachu', 80, 10, initialHealth, attack1);
        const pokemon2 = new Pokemon(2, 'Bulbizarre', 50, 10, initialHealth, attack2);

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

        this.pokemon1 = battle.getFirstPokemonBattle();
        this.pokemon2 = this.pokemon1 === battle.pokemon1 ? battle.pokemon2 : battle.pokemon1;

        this.eventInfos.logs.push(new Log(`${this.pokemon1.name} commence en premier le combat.`));

        this.eventInfos.gameStatus = GameStatusEnum.Running;
        this.fight2();
    }

    private fight(observable: Subscription): void {

        if (this.eventInfos.gameStatus === GameStatusEnum.Paused) {
            this.eventInfos.gameStatus = GameStatusEnum.Paused;
            observable.unsubscribe();
            return;
        }

        let pokemon1: Pokemon = this.pokemon1;
        let pokemon2: Pokemon = this.pokemon2;
        this.eventInfos.pokemonIsAttacking = [false, false];

        // change pokemon position for the next round
        if (this.roundIsComplete) {
            pokemon1 = this.pokemon2;
            pokemon2 = this.pokemon1;  
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

        if (pokemon2.health > 0) {
            this.eventInfos.logs.push(new Log(`Il reste ${pokemon2.health} points de vie à ${pokemon2.name}.`));
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
