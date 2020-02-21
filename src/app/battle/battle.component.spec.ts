import { async, ComponentFixture, TestBed, tick, flush } from '@angular/core/testing';
import { BattleComponent } from './battle.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { fakeAsync } from '@angular/core/testing';


describe('BattleComponent', () => {
  let component: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleComponent ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}, {
        provide: ActivatedRoute,
        useValue: {
          params: of({
            idP1: 1,
            idP2: 2
          })
        }
      }],
      imports: [
        RouterModule.forRoot([
          {path: 'battle/:idP1/:idP2', component: BattleComponent}
        ])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Pokemon'`, () => {
    const fixture = TestBed.createComponent(BattleComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Pokemon');
  });

  /*it('should launch the battle', fakeAsync((): void => {
    const fixture = TestBed.createComponent(BattleComponent);
    const view = fixture.nativeElement;
    let app = fixture.componentInstance;
    
    //tick(3000);
    //fixture.detectChanges();

    let source = of(app).subscribe(response => {
        view.querySelector('#startButton').click();
        tick(3000);
        expect(response.eventInfos.logs.length).toBeGreaterThan(0);
    });

  }));*/

});
