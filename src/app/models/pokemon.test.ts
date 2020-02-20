import { Pokemon } from './pokemon';
import { Battle } from './battle';
import { Attack } from './attack';
import { Stats } from './stats';

describe('getFirstPokemonBattle', () => {

    const attack = new Attack('Eclair', 25, 1);

    it('should return the first pokemon with more speed than the second', () => {
        const statsSalameche = new Stats(100, 90, 80, 80, 80, 80 );
        const statsBulbizare = new Stats(100, 80, 80, 80, 80, 80 );
        const pokemon1 = new Pokemon(0, 'Salameche', statsSalameche, 20, attack );
        const pokemon2 = new Pokemon(1, 'Bulbizarre', statsBulbizare, 20, attack);
        const battle = new Battle(pokemon1, pokemon2);

        expect(battle.getFirstPokemonBattle()).toBe(pokemon1);
    });

    it('should return the second pokemon with more speed than the first', () => {
      const statsSalameche = new Stats(100, 80, 80, 80, 80, 80 );
      const statsBulbizare = new Stats(100, 90, 80, 80, 80, 80 );
      const pokemon1 = new Pokemon(0, 'Salameche', statsSalameche, 20, attack );
      const pokemon2 = new Pokemon(1, 'Bulbizarre', statsBulbizare, 20, attack);
      const battle = new Battle(pokemon1, pokemon2);

      expect(battle.getFirstPokemonBattle()).toBe(pokemon2);
    });

    it('should return the first pokemon with higher priority move', () => {
      const attack2 = new Attack('Eclair', 25, 2);
      const statsSalameche = new Stats(100, 80, 80, 80, 80, 80 );
      const statsBulbizare = new Stats(100, 80, 80, 80, 80, 80 );
      const pokemon1 = new Pokemon(0, 'Salameche', statsSalameche, 20, attack2 );
      const pokemon2 = new Pokemon(1, 'Bulbizarre', statsBulbizare, 20, attack);
      const battle = new Battle(pokemon1, pokemon2);

      expect(battle.getFirstPokemonBattle()).toBe(pokemon1);
    });


    it('should return the second pokemon with higher priority move', () => {
        const attack2 = new Attack('Eclair', 25, 2);
        const statsSalameche = new Stats(100, 80, 80, 80, 80, 80 );
        const statsBulbizare = new Stats(100, 80, 80, 80, 80, 80 );
        const pokemon1 = new Pokemon(0, 'Salameche', statsSalameche, 20, attack );
        const pokemon2 = new Pokemon(1, 'Bulbizarre', statsBulbizare, 20, attack2);
        const battle = new Battle(pokemon1, pokemon2);

        expect(battle.getFirstPokemonBattle()).toBe(pokemon2);
    });

    it('should return the first pokemon with the same stats and low probability', () => {
        const statsSalameche = new Stats(100, 80, 80, 80, 80, 80 );
        const statsBulbizare = new Stats(100, 80, 80, 80, 80, 80 );
        const pokemon1 = new Pokemon(0, 'Salameche', statsSalameche, 20, attack );
        const pokemon2 = new Pokemon(1, 'Bulbizarre', statsBulbizare, 20, attack);
        const battle = new Battle(pokemon1, pokemon2);

        expect(battle.getFirstPokemonBattle(0.41)).toBe(pokemon1);
    });

    it('should return the second pokemon with the same stats and high probability', () => {
        const statsSalameche = new Stats(100, 80, 80, 80, 80, 80 );
        const statsBulbizare = new Stats(100, 80, 80, 80, 80, 80 );
        const pokemon1 = new Pokemon(0, 'Salameche', statsSalameche, 20, attack );
        const pokemon2 = new Pokemon(1, 'Bulbizarre', statsBulbizare, 20, attack);
        const battle = new Battle(pokemon1, pokemon2);

        expect(battle.getFirstPokemonBattle(0.77)).toBe(pokemon2);
    });

});

describe('attackPokemon', () => {

  const attack = new Attack('Eclair', 40, 1);

  it('should return 75 health remaining for pokemon2 with an 25 pnt of attack', () => {
    const statsSalameche = new Stats(100, 90, 48, 48, 48, 48 );
    const statsBulbizare = new Stats(100, 60, 48, 48, 48, 48 );
    const pokemon1 = new Pokemon(0, 'Salameche', statsSalameche, 10, attack );
    const pokemon2 = new Pokemon(1, 'Bulbizarre', statsBulbizare, 10, attack);
    pokemon1.attackPokemon(pokemon2);

    expect(pokemon2.stats.health).toBe(94);
  });

  it('should return 0 health remaining with an 25 pnt of attack and 10 pnt of health', () => {
    const statsSalameche = new Stats(100, 90, 48, 48, 48, 48 );
    const statsBulbizare = new Stats(10, 60, 48, 48, 48, 48 );
    const pokemon1 = new Pokemon(0, 'Salameche', statsSalameche, 20, attack );
    const pokemon2 = new Pokemon(1, 'Bulbizarre', statsBulbizare, 10, attack);
    pokemon1.attackPokemon(pokemon2);

    expect(pokemon2.stats.health).toBe(0);
  });

});
