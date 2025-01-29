import { Component } from '@angular/core';
import { MovieMiniCardListComponent } from "../../components/movie-mini-card-list/movie-mini-card-list.component";
import { GalleryComponent } from "../../shared/gallery/gallery.component";
import { MainHeaderComponent } from "../../shared/main-header/main-header.component";
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-actor-page',
  imports: [MovieMiniCardListComponent, GalleryComponent, MainHeaderComponent, TabsModule, CardModule,
    ButtonModule,
  ],
  templateUrl: './actor-page.component.html',
  styleUrl: './actor-page.component.scss'
})
export class ActorPageComponent {

  // data to test the movie mini card list component
  items = [
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg', text: 'Movie name 1', year: 2020 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg', text: 'Movie name 2', year: 2019 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg', text: 'Movie name 3', year: 2021 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg', text: 'Movie name 4', year: 2018 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg', text: 'Movie name 5', year: 2022 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg', text: 'Movie name 6', year: 2017 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7.jpg', text: 'Movie name 7', year: 2023 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria8.jpg', text: 'Movie name 8', year: 2020 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria9.jpg', text: 'Movie name 9', year: 2016 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg', text: 'Movie name 10', year: 2015 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg', text: 'Movie name 11', year: 2019 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria12.jpg', text: 'Movie name 12', year: 2014 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria13.jpg', text: 'Movie name 13', year: 2021 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria14.jpg', text: 'Movie name 14', year: 2013 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria15.jpg', text: 'Movie name 15', year: 2022 }
  ];

  // data to test the gallery component
  public images: string[] = [
    "https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria7.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria8.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria9.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria12.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria13.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria14.jpg",
    "https://primefaces.org/cdn/primeng/images/galleria/galleria15.jpg"
  ];

}
