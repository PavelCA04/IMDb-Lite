import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { IMDbService } from '../../services/imdb.service';

@Component({
  selector: 'shared-main-header',
  imports: [CarouselModule, ButtonModule, RouterModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent {

  constructor(
    private imdbService: IMDbService,
    private router: Router,
  ) { }

  carouselItems = [
    {
      image: 'background.png',
      title: 'Inception',
      description: 'A brief description about the movie Inception.'
    },
    {
      image: 'darkknight.png',
      title: 'The Dark Knight',
      description: 'A brief description about The Dark Knight.'
    },
    {
      image: 'interstellar.png',
      title: 'Interstellar',
      description: 'A brief description about Interstellar.'
    }
  ];

  public userAuth(): boolean {
    return this.imdbService.checkUser();
  }

  public logout(): void {
    this.imdbService.logout();
    this.router.navigate(['/']);
  }

  public login(): void {
    this.router.navigate(['/login']);
  }

}

