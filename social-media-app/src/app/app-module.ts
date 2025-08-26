import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Registration } from './components/registration/registration';
import { Profile } from './components/profile/profile';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { ReactiveFormsModule } from '@angular/forms';
import { Friends } from './components/friends/friends'


@NgModule({
  declarations: [
    App,
    Registration,
    Profile,
    Login,
    Home,
    Friends
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule { }
