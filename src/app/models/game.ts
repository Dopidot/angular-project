import { Pokemon } from './pokemon';
import { Battle } from './battle';
import { Attack } from './attack';
import { GameStatus, GameStatusEnum } from '../models/gameStatus';

export class Game {

    public messages: string[] = [];
    public gameStatus: GameStatus = new GameStatus(GameStatusEnum.Stopped);

    private pokemon1: Pokemon;
    private pokemon2: Pokemon;
    private myTimer: any;
    
    constructor( ) { }

    startGame() : void {
        this.initBattle();
    }

    private initBattle() {
        const initialHealth = 100;
        const attack1 = new Attack('éclair', 25);
        const attack2 = new Attack('coupe', 31);
    
        const pokemon1 = new Pokemon('Pikachu', 80, 10, initialHealth, attack1);
        const pokemon2 = new Pokemon('Bulbizarre', 50, 10, initialHealth, attack2);

        this.messages.splice(0, this.messages.length);

        this.startBattle(new Battle(pokemon1, pokemon2));
    }

    private startBattle(battle: Battle) {

        this.messages.push('Lancement du combat...');

        this.pokemon1 = battle.getFirstPokemonBattle();
        this.pokemon2 = this.pokemon1 === battle.pokemon1 ? battle.pokemon2 : battle.pokemon1;
        
        this.messages.push(`${this.pokemon1.name} commence en premier le combat.`);

        this.gameStatus.state = GameStatusEnum.Running;
        this.fight();
    }

    private fight() : void {

        this.myTimer = setInterval(function() {

            if (this.gameStatus.state === GameStatusEnum.Paused) {
                clearInterval(this.myTimer);
                this.gameStatus.state = GameStatusEnum.Paused;
                return;
            }

            this.messages.push(`${this.pokemon1.name} lance attaque ${this.pokemon1.attack.name} sur ${this.pokemon2.name}.`);

            this.pokemon1.attackPokemon(this.pokemon2);

            if (this.pokemon2.health > 0) {
                this.messages.push(`Il reste ${this.pokemon2.health} points de vie à ${this.pokemon2.name}.`);
            }
            else {
                this.messages.push(`${this.pokemon2.name} est KO.`);
                this.messages.push(`${this.pokemon1.name} gagne le combat.`);

                this.gameStatus.state = GameStatusEnum.Stopped;
                clearInterval(this.myTimer);
            }

            // change pokemon position for the next fight
            let temp = this.pokemon1;
            this.pokemon1 = this.pokemon2;
            this.pokemon2 = temp;
            
        }.bind(this), 1000);
    }

    public resumeGame() : void {
        this.gameStatus.state = GameStatusEnum.Running;
        this.fight();
    }

}