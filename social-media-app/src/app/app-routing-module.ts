import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Profile } from './components/profile/profile';
import { Registration } from './components/registration/registration';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { Friends } from './components/friends/friends';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'registration', component: Registration},
  {path: 'login', component: Login},
  {path: 'home', component: Home},
  {path: 'profile', component: Profile},
  {path: 'friends', component: Friends}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
