import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { BattleService } from '../services/battle.service';
import { GameStatusEnum } from '../models/gameStatus';
import { Log } from '../models/log';
import { EventInfos } from '../models/eventInfos';
import { interval, Observable, Subscriber } from 'rxjs';
import { takeWhile } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class GameService {

    public eventInfos: EventInfos = new EventInfos();

    public first: Pokemon;
    private second: Pokemon;
    private roundIsComplete: boolean = false;
    private isFinished: boolean = false;
    private battle: BattleService;

    constructor() {
    }

    public startGame(pokemon1: Pokemon, pokemon2: Pokemon): Observable<EventInfos> {

        this.eventInfos.winnerPokemonId = -1;
        this.eventInfos.logs.splice(0, this.eventInfos.logs.length);
        this.eventInfos.pokemon1 = pokemon1;
        this.eventInfos.pokemon2 = pokemon2;

        this.roundIsComplete = false;
        this.isFinished = false;
        this.battle = new BattleService();

        return this.startBattle(this.battle, pokemon1, pokemon2);
    }

    private startBattle(battle: BattleService, pokemon1: Pokemon, pokemon2: Pokemon): Observable<EventInfos> {

        this.eventInfos.logs.push(new Log('Lancement du combat...'));

        this.first = battle.getFirstPokemonBattle(pokemon1, pokemon2);
        this.second = this.first === pokemon1 ? pokemon2 : pokemon1;

        this.eventInfos.logs.push(new Log(`${this.first.name} commence en premier le combat.`));

        this.eventInfos.gameStatus = GameStatusEnum.Running;

        return new Observable<EventInfos>(subscriber => {
            this.gameLoop(subscriber);
        });
    }

    private gameLoop(sub: Subscriber<EventInfos>) {

        let fightIsFinished = false
        let myInterval = interval(1000).pipe(takeWhile(()=> !fightIsFinished));

        myInterval.subscribe(subscriber => {
            if (!this.fight(sub)) {
                fightIsFinished = true;
            }
        });
    }

    private fight(sub: Subscriber<EventInfos>): boolean {

        sub.next(this.eventInfos);

        if (this.eventInfos.gameStatus === GameStatusEnum.Paused) {
            this.eventInfos.gameStatus = GameStatusEnum.Paused;
            sub.unsubscribe();
            return false;
        }

        let pokemon1: Pokemon = this.first;
        let pokemon2: Pokemon = this.second;
        this.eventInfos.pokemonIsAttacking = [false, false];

        // change pokemon position for the next round
        if (this.roundIsComplete) {
            pokemon1 = this.second;
            pokemon2 = this.first;
        }

        if (this.isFinished) {

            this.eventInfos.logs.push(new Log(`${pokemon1.name} est ko.`, false));
            this.eventInfos.logs.push(new Log(`${pokemon2.name} gagne le combat.`));
            this.eventInfos.pokemonIsAttacking = [false, false];

            this.eventInfos.winnerPokemonId = pokemon2.id;
            this.eventInfos.gameStatus = GameStatusEnum.Stopped;
            sub.unsubscribe();
            return false;
        }

        let dmgPoints = this.battle.attackPokemon(pokemon1, pokemon2);
        this.eventInfos.logs.push(new Log(`${pokemon1.name} lance attaque ${pokemon1.attack.name} sur ${pokemon2.name}.`, true, dmgPoints));
        this.eventInfos.pokemonIsAttacking = [this.roundIsComplete ? false : true, this.roundIsComplete ? true : false];

        if (pokemon2.stats.health > 0) {
            this.eventInfos.logs.push(new Log(`Il reste ${pokemon2.stats.health} points de vie à ${pokemon2.name}.`));
        }
        else {
            this.isFinished = true;
        }

        this.roundIsComplete = !this.roundIsComplete;

        return true;
    }

    public resumeGame(): Observable<EventInfos> {
        this.eventInfos.gameStatus = GameStatusEnum.Running;
        
        return new Observable<EventInfos>(subscriber => {
            this.gameLoop(subscriber);
        });
    }

    public pauseGame() : void {
        this.eventInfos.gameStatus = GameStatusEnum.Paused;
    }

}
