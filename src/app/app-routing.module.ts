import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { MainComponent } from './features/login/pages/main/main.component';

const routes: Routes = [
  { path: 'login', component: MainComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
