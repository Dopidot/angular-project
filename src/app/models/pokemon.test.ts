import { Pokemon } from './pokemon';
import { Battle } from './battle';
import { Attack } from './attack';

/*function multiplyBy4(tab = []) {
    return tab;
}

describe('multiplyBy4', () => {
    it('should return empty array', () => {
        expect(multiplyBy4([])).toEqual([]);
    });
});*/

describe('getFirstPokemonBattle', () => {

    const attack = new Attack('Eclair', 25);
    const health = 100;

    it('should return the first pokemon with more speed than the second', () => {
        const pokemon1 = new Pokemon('Salameche', 80, 10, health, attack);
        const pokemon2 = new Pokemon('Bulbizarre', 50, 10, health, attack);
        const battle = new Battle(pokemon1, pokemon2);

        expect(battle.getFirstPokemonBattle()).toBe(pokemon1);
    });

    it('should return the second pokemon with more speed than the first', () => {
        const pokemon1 = new Pokemon('Salameche', 50, 10, health, attack);
        const pokemon2 = new Pokemon('Bulbizarre', 80, 10, health, attack);
        const battle = new Battle(pokemon1, pokemon2);

        expect(battle.getFirstPokemonBattle()).toBe(pokemon2);
    });

    it('should return the first pokemon with higher priority move', () => {
        const pokemon1 = new Pokemon('Salameche', 100, 30, health, attack);
        const pokemon2 = new Pokemon('Bulbizarre', 100, 10, health, attack);
        const battle = new Battle(pokemon1, pokemon2);

        expect(battle.getFirstPokemonBattle()).toBe(pokemon1);
    });

    
    it('should return the second pokemon with higher priority move', () => {
        const pokemon1 = new Pokemon('Salameche', 100, 10, health, attack);
        const pokemon2 = new Pokemon('Bulbizarre', 100, 40, health, attack);
        const battle = new Battle(pokemon1, pokemon2);

        expect(battle.getFirstPokemonBattle()).toBe(pokemon2);
    });

    it('should return the first pokemon with the same stats and low probability', () => {
        const pokemon1 = new Pokemon('Salameche', 100, 40, health, attack);
        const pokemon2 = new Pokemon('Bulbizarre', 100, 40, health, attack);
        const battle = new Battle(pokemon1, pokemon2);

        expect(battle.getFirstPokemonBattle(0.41)).toBe(pokemon1);
    });

    it('should return the second pokemon with the same stats and high probability', () => {
        const pokemon1 = new Pokemon('Salameche', 100, 40, health, attack);
        const pokemon2 = new Pokemon('Bulbizarre', 100, 40, health, attack);
        const battle = new Battle(pokemon1, pokemon2);

        expect(battle.getFirstPokemonBattle(0.77)).toBe(pokemon2);
    });

});

describe('attackPokemon', () => {

    const attack = new Attack('Eclair', 25);
    const maxHealth = 100;

    it('should return 75 health remaining for pokemon2 with an 25 pnt of attack', () => {
        const pokemon1 = new Pokemon('Salameche', 80, 10, maxHealth, attack);
        const pokemon2 = new Pokemon('Bulbizarre', 50, 10, maxHealth, attack);
        pokemon1.attackPokemon(pokemon2);

        expect(pokemon2.health).toBe(75);
    });

    it('should return 0 health remaining with an 25 pnt of attack and 10 pnt of health', () => {
        const pokemon1 = new Pokemon('Salameche', 80, 10, maxHealth, attack);
        const pokemon2 = new Pokemon('Bulbizarre', 50, 10, 10, attack);
        pokemon1.attackPokemon(pokemon2);

        expect(pokemon2.health).toBe(0);
    });

});