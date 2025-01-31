import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { MainHeaderComponent } from "../../shared/main-header/main-header.component";
import { GalleryComponent } from "../../shared/gallery/gallery.component";
import { ActorMiniCardListComponent } from "../../components/actor-mini-card-list/actor-mini-card-list.component";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DeleteBtnComponent } from "../../shared/delete-btn/delete-btn.component";

@Component({
  selector: 'app-movie-page',
  imports: [TabsModule, CardModule, MainHeaderComponent, GalleryComponent, ActorMiniCardListComponent,
    RatingModule, FormsModule, ChipModule, DividerModule, ButtonModule],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss'
})
export class MoviePageComponent {

  // data to test the id of the url when edit
  public movieTitle : string = 'movie';

  // data to test the rating
  public selectedRating : number = 5;

   // data to test the component
   items = [
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg', text: 'Actor name 1', year: 2020 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg', text: 'Actor name 2', year: 2019 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg', text: 'Actor name 3', year: 2021 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg', text: 'Actor name 4', year: 2018 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg', text: 'Actor name 5', year: 2022 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg', text: 'Actor name 6', year: 2017 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7.jpg', text: 'Actor name 7', year: 2023 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria8.jpg', text: 'Actor name 8', year: 2020 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria9.jpg', text: 'Actor name 9', year: 2016 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg', text: 'Actor name 10', year: 2015 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg', text: 'Actor name 11', year: 2019 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria12.jpg', text: 'Actor name 12', year: 2014 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria13.jpg', text: 'Actor name 13', year: 2021 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria14.jpg', text: 'Actor name 14', year: 2013 },
    { image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria15.jpg', text: 'Actor name 15', year: 2022 }
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
