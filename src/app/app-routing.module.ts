import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BattleComponent } from './battle/battle.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'battle', component: BattleComponent},
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
