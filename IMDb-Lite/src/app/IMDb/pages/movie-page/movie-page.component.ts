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
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DeleteBtnComponent } from "../../shared/delete-btn/delete-btn.component";
import { Movie } from '../../interfaces/imdb.interfaces';
import { IMDbService } from '../../services/imdb.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-page',
  imports: [
    TabsModule, 
    CardModule, 
    MainHeaderComponent, 
    GalleryComponent, 
    ActorMiniCardListComponent,
    RatingModule, 
    FormsModule, 
    ChipModule, 
    DividerModule, 
    ButtonModule,
    DeleteBtnComponent,
    RouterModule,
    CommonModule  
  ],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss'
})
export class MoviePageComponent {

  public imgPath = '';

  constructor(
    private imdbService: IMDbService,
    private route: ActivatedRoute,
  ) { }

  private id = '';

  // data to test the id of the url when edit
  public movie: Movie | undefined = undefined;
  public movieRating : number = 5;

  // data to test the rating
  public selectedRating : number = 5;

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

  public getMovie() {
    this.imdbService.getMovieById(this.id).subscribe(movie => {
      this.movie = movie;
      this.selectedRating = movie?.rating || 0;
      this.imgPath = movie?.images.find((image: any) => image.is_cover === true)?.url || '';  
      this.images = movie?.images
        .filter((image: any) => image.is_cover !== true)
        .map((image: any) => image.url) || [];
      console.log('Movie', this.images);
  
      
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getMovie();
      
    });
  }

}
