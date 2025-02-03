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
  private id = '';
  public movie: Movie | undefined = undefined;
  public movieRating : number = 5;
  public selectedRating : number = 5;
  public images: string[] = [];
  public director: string = '';

  constructor(
    private imdbService: IMDbService,
    private route: ActivatedRoute,
  ) { }

  public getMovie() {
    this.imdbService.getMovieById(this.id).subscribe(movie => {
      this.movie = movie;
      this.selectedRating = movie?.rating || 0;
      this.imgPath = movie?.images.find((image: any) => image.is_cover === true)?.url || '';  
      this.images = movie?.images
        .filter((image: any) => image.is_cover !== true)
        .map((image: any) => image.url) || [];
      });
      this.movie!.director = this.movie?.director ? this.movie.director.toLocaleLowerCase() : '';
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getMovie();
    });
  }

  public userAuth(): boolean {
    return this.imdbService.checkUserAdmin();
  }
}
