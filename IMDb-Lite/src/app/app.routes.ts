import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { MoviesComponent } from './IMDb/pages/movies/movies.component';
import { ActorsComponent } from './IMDb/pages/actors/actors.component';
import { ActorPageComponent } from './IMDb/pages/actor-page/actor-page.component';
import { MoviePageComponent } from './IMDb/pages/movie-page/movie-page.component';
import { MovieFormComponent } from './IMDb/pages/movie-form/movie-form.component';
import { ActorFormComponent } from './IMDb/pages/actor-form/actor-form.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: LoginPageComponent
  }, {
    path: 'movies',
    component: MoviesComponent
  }, {
    path: 'movies/new',
    component: MovieFormComponent
  }, {
    path: 'movies/edit/:id',
    component: MovieFormComponent
  }, {
    path: 'movies/:id',
    component: MoviePageComponent
  }, {
    path: 'actors',
    component: ActorsComponent
  }, {
    path: 'actors/new',
    component: ActorFormComponent
  }, {
    path: 'actors/edit/:id',
    component: ActorFormComponent
  }, {
    path: 'actors/:id',
    component: ActorPageComponent
  }, {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  }, {
    path: '**',
    redirectTo: 'movies'
  }
];
