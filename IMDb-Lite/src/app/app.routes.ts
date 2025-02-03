import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { MoviesComponent } from './IMDb/pages/movies/movies.component';
import { ActorsComponent } from './IMDb/pages/actors/actors.component';
import { ActorPageComponent } from './IMDb/pages/actor-page/actor-page.component';
import { MoviePageComponent } from './IMDb/pages/movie-page/movie-page.component';
import { MovieFormComponent } from './IMDb/pages/movie-form/movie-form.component';
import { ActorFormComponent } from './IMDb/pages/actor-form/actor-form.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  }, 
  {
    path: 'signup',
    component: LoginPageComponent
  },
  {
    path: 'movies',
    component: MoviesComponent
  }, 
  {
    path: 'movies/new',
    component: MovieFormComponent,
    canActivate: [AuthGuard] 
  }, 
  {
    path: 'movies/edit/:id',
    component: MovieFormComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'movies/:id',
    component: MoviePageComponent
  }, 
  {
    path: 'actors',
    component: ActorsComponent
  }, 
  {
    path: 'actors/new',
    component: ActorFormComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'actors/edit/:id',
    component: ActorFormComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'actors/:id',
    component: ActorPageComponent
  }, 
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  }, 
  {
    path: '**',
    redirectTo: 'movies'
  }
];
