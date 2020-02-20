import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { GameStatusEnum } from '../models/gameStatus';
import { EventInfos } from '../models/eventInfos';

@Component({
    selector: 'app-battle',
    templateUrl: './battle.component.html',
    styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  title = 'Pokemon';
  eventInfos: EventInfos;
  startDate: Date;

  constructor(
    public gameService: GameService
  ) { }

  ngOnInit(): void {
    this.eventInfos = this.gameService.eventInfos;
  }

  public startGame(): void {
    this.gameService.startGame();
    this.startDate = new Date();
  }

  public pauseGame(): void {
    this.eventInfos.gameStatus = GameStatusEnum.Paused;
  }

  public resumeGame(): void {
    this.gameService.resumeGame();
  }

}
