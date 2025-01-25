import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-main-header',
  imports: [CarouselModule, ButtonModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent {
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
}

