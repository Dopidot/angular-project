import { Pokemon } from './pokemon';
import { Battle } from './battle';
import { Attack } from './attack';

export class Game {

    public messages: string[] = [];

    constructor() { }

    getMessage(): string[] {
        return this.messages;
    }

    startGame(): void {
        this.initBattle();
    }

    private initBattle() {
        const initialHealth = 100;
        const attack1 = new Attack('éclair', 25);
        const attack2 = new Attack('coupe', 31);

        const pokemon1 = new Pokemon('Pikachu', 80, 10, initialHealth, attack1);
        const pokemon2 = new Pokemon('Bulbizarre', 50, 10, initialHealth, attack2);

        this.startBattle(new Battle(pokemon1, pokemon2));
    }

    private startBattle(battle: Battle) {

        this.messages.push('Lancement du combat...');

        const firstPokemon = battle.getFirstPokemonBattle();
        const secondPokemon = firstPokemon === battle.pokemon1 ? battle.pokemon2 : battle.pokemon1;

        this.messages.push(`${firstPokemon.name} commence en premier le combat.`);

        this.fight(firstPokemon, secondPokemon);
    }

    private fight(pokemon1: Pokemon, pokemon2: Pokemon): void {

        const myTimer = setInterval(function() {

            this.messages.push(`${pokemon1.name} lance attaque ${pokemon1.attack.name} sur ${pokemon2.name}.`);

            pokemon1.attackPokemon(pokemon2);

            if (pokemon2.health > 0) {
                this.messages.push(`Il reste ${pokemon2.health} points de vie à ${pokemon2.name}.`);
            } else {
                this.messages.push(`${pokemon2.name} est mort.`);
                this.messages.push(`${pokemon1.name} gagne le combat.`);
                clearInterval(myTimer);
            }

            // change pokemon position for the next fight
            const temp = pokemon1;
            pokemon1 = pokemon2;
            pokemon2 = temp;

        }.bind(this), 3000);
    }
}
