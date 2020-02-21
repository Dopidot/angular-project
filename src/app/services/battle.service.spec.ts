import { TestBed } from '@angular/core/testing';
import { Attack } from '../models/attack';
import { Pokemon } from '../models/pokemon';
import { Stats } from '../models/stats';
import { BattleService } from './battle.service';

describe('BattleService', () => {
    let service: BattleService;
    let attack: Attack;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BattleService]
        })
            .compileComponents();

        service = TestBed.inject(BattleService);
        attack = new Attack('Eclair', 25, 1);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return the first pokemon with more speed than the second', () => {
        const statsSalameche = new Stats(100, 90, 80, 80, 80, 80);
        const statsBulbizare = new Stats(100, 80, 80, 80, 80, 80);
        const pokemon1 = new Pokemon(0, 'Salameche', statsSalameche, 20, attack, '');
        const pokemon2 = new Pokemon(1, 'Bulbizarre', statsBulbizare, 20, attack, '');
        const battle = new BattleService();

        expect(battle.getFirstPokemonBattle(pokemon1, pokemon2)).toBe(pokemon1);
    });

    it('should return the second pokemon with more speed than the first', () => {
        const statsSalameche = new Stats(100, 80, 80, 80, 80, 80);
        const statsBulbizare = new Stats(100, 90, 80, 80, 80, 80);
        const pokemon1 = new Pokemon(0, 'Salameche', statsSalameche, 20, attack, '');
        const pokemon2 = new Pokemon(1, 'Bulbizarre', statsBulbizare, 20, attack, '');
        const battle = new BattleService();

        expect(battle.getFirstPokemonBattle(pokemon1, pokemon2)).toBe(pokemon2);
    });

    it('should return the first pokemon with higher priority move', () => {
        const attack2 = new Attack('Eclair', 25, 2);
        const statsSalameche = new Stats(100, 80, 80, 80, 80, 80);
        const statsBulbizare = new Stats(100, 80, 80, 80, 80, 80);
        const pokemon1 = new Pokemon(0, 'Salameche', statsSalameche, 20, attack2, '');
        const pokemon2 = new Pokemon(1, 'Bulbizarre', statsBulbizare, 20, attack, '');
        const battle = new BattleService();

        expect(battle.getFirstPokemonBattle(pokemon1, pokemon2)).toBe(pokemon1);
    });


    it('should return the second pokemon with higher priority move', () => {
        const attack2 = new Attack('Eclair', 25, 2);
        const statsSalameche = new Stats(100, 80, 80, 80, 80, 80);
        const statsBulbizare = new Stats(100, 80, 80, 80, 80, 80);
        const pokemon1 = new Pokemon(0, 'Salameche', statsSalameche, 20, attack, '');
        const pokemon2 = new Pokemon(1, 'Bulbizarre', statsBulbizare, 20, attack2, '');
        const battle = new BattleService();

        expect(battle.getFirstPokemonBattle(pokemon1, pokemon2)).toBe(pokemon2);
    });

    it('should return the first pokemon with the same stats and low probability', () => {
        const statsSalameche = new Stats(100, 80, 80, 80, 80, 80);
        const statsBulbizare = new Stats(100, 80, 80, 80, 80, 80);
        const pokemon1 = new Pokemon(0, 'Salameche', statsSalameche, 20, attack, '');
        const pokemon2 = new Pokemon(1, 'Bulbizarre', statsBulbizare, 20, attack, '');
        const battle = new BattleService();

        expect(battle.getFirstPokemonBattle(pokemon1, pokemon2, 0.41)).toBe(pokemon1);
    });

    it('should return the second pokemon with the same stats and high probability', () => {
        const statsSalameche = new Stats(100, 80, 80, 80, 80, 80);
        const statsBulbizare = new Stats(100, 80, 80, 80, 80, 80);
        const pokemon1 = new Pokemon(0, 'Salameche', statsSalameche, 20, attack, '');
        const pokemon2 = new Pokemon(1, 'Bulbizarre', statsBulbizare, 20, attack, '');
        const battle = new BattleService();

        expect(battle.getFirstPokemonBattle(pokemon1, pokemon2, 0.77)).toBe(pokemon2);
    });

    it('should return 75 health remaining for pokemon2 with an 25 pnt of attack', () => {
        const statsSalameche = new Stats(100, 90, 48, 48, 48, 48);
        const statsBulbizare = new Stats(100, 60, 48, 48, 48, 48);
        const pokemon1 = new Pokemon(0, 'Salameche', statsSalameche, 10, attack, '');
        const pokemon2 = new Pokemon(1, 'Bulbizarre', statsBulbizare, 10, attack, '');
        const battle = new BattleService();

        attack = new Attack('Eclair', 40, 1);
        battle.attackPokemon(pokemon1, pokemon2);

        expect(pokemon2.stats.health).toBe(95);
    });

    it('should return 0 health remaining with an 25 pnt of attack and 7 pnt of health', () => {
        const statsSalameche = new Stats(100, 90, 48, 48, 48, 48);
        const statsBulbizare = new Stats(7, 60, 48, 48, 48, 48);
        const pokemon1 = new Pokemon(0, 'Salameche', statsSalameche, 20, attack, '');
        const pokemon2 = new Pokemon(1, 'Bulbizarre', statsBulbizare, 10, attack, '');
        const battle = new BattleService();

        attack = new Attack('Eclair', 40, 1);
        battle.attackPokemon(pokemon1, pokemon2);

        expect(pokemon2.stats.health).toBe(0);
    });

});
