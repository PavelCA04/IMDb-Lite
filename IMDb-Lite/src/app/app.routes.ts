import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { MoviesComponent } from './IMDb/pages/movies/movies.component';
import { ActorsComponent } from './IMDb/pages/actors/actors.component';
import { MovieMiniCardListComponent } from './IMDb/components/movie-mini-card-list/movie-mini-card-list.component';
import { ActorMiniCardListComponent } from './IMDb/components/actor-mini-card-list/actor-mini-card-list.component';

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
  }, {
    path: 'test',
    component: ActorMiniCardListComponent
  }, {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  }, {
    path: '**',
    redirectTo: 'movies'
  }
];
