import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { IMDbService } from '../IMDb/services/imdb.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private imdbService: IMDbService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.imdbService.checkUserAdmin()) {
      return true;
    } else {
      this.router.navigate(['/login']);  
      return false;
    }
  }
}
