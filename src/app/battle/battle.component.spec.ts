import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleComponent } from './battle.component';

describe('BattleComponent', () => {
  let component: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleComponent ]
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

  it('should render title', () => {
    const fixture = TestBed.createComponent(BattleComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('pokemon app is running!');
  });

  it('should launch the battle', () => {
    const fixture = TestBed.createComponent(BattleComponent);
    const view = fixture.nativeElement;
    const app = fixture.componentInstance;
    view.querySelector('#startButton').click();
    fixture.detectChanges();
    expect(app.eventInfos.logs.length).toBeGreaterThan(0);
  });
});
