import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { MainHeaderComponent } from './IMDb/shared/main-header/main-header.component';

export const routes: Routes = [
{
    path: 'auth',
    component: LoginPageComponent
},
{
    path: 'imdb',
    component: MainHeaderComponent
}
];
