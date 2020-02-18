import { Component, Input } from '@angular/core';
import { Game } from './models/game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'pokemon';
    @Input() messages: string[];

    launchGame() {
        let game = new Game();
        game.startGame();
        this.messages = game.getMessage();

        //console.log('Here :');

        //console.log(game.getMessage());
    }
}
