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
      image: 'https://www.wallpaperflare.com/static/362/256/53/harry-potter-and-the-deathly-hallows-harry-potter-daniel-radcliffe-harry-wallpaper.jpg',
      title: 'Harry Potter',
    },
    {
      image: 'https://images.alphacoders.com/765/thumb-1920-765810.jpg',
      title: 'Fantastic Beasts',
    },
    {
      image: 'https://wallpaperaccess.com/full/198680.jpg',
      title: 'Fast and Furious',
    },
    {
      image: 'https://th.bing.com/th/id/R.4550ae959d3581faf11e7312519638ba?rik=C6%2fyJnDuCPiHxA&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fwp1867297.jpg&ehk=pqQ%2fo3wz5xcsp2OkoGuXl%2bA4RLDDE5bmN3S%2bDeKhxAc%3d&risl=&pid=ImgRaw&r=0',
      title: 'John Wick',
    },
    {
      image: 'https://www.wallpaperflare.com/static/823/606/524/transformers-age-of-extinction-movies-transformers-age-wallpaper.jpg',
      title: 'Transformers',
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

