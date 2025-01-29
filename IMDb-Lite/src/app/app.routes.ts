import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { MoviesComponent } from './IMDb/pages/movies/movies.component';
import { ActorsComponent } from './IMDb/pages/actors/actors.component';
import { ActorPageComponent } from './IMDb/pages/actor-page/actor-page.component';
import { MoviePageComponent } from './IMDb/pages/movie-page/movie-page.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: LoginPageComponent
  }, {
    path: 'movies',
    component: MoviesComponent
  }, { 
    path: 'actors', 
    component: ActorsComponent
  },{
    path: 'actors/:id',
    component: ActorPageComponent
  }, {
    path: 'movies/:id',
    component: MoviePageComponent
  }, {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  }, {
    path: '**',
    redirectTo: 'movies'
  }
];
