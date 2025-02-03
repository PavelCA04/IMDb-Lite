import { Component, Input, OnChanges, SimpleChanges, OnInit, OnDestroy, ChangeDetectorRef, EnvironmentInjector } from '@angular/core';
import { MainHeaderComponent } from "../../shared/main-header/main-header.component";
import { CardListComponent } from "../../shared/card-list/card-list.component";
import { BaseCard } from '../../types/BaseCard';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IMDbService } from '../../services/imdb.service';
import { Genre, Movie, MovieInformation, MovieSearchParams } from '../../interfaces/imdb.interfaces';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { environment } from '../../../../environments/environment'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movies',
  imports: [
    MainHeaderComponent, 
    CardListComponent, 
    FloatLabelModule, 
    DatePickerModule, 
    InputTextModule,
    MultiSelectModule, 
    RatingModule, 
    ButtonModule, 
    FormsModule, 
    CommonModule,
    PaginatorModule,
    RouterModule
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {

  private movies: Movie[] = [];

  public totalMovies = 120;
  public pagination = 18;

  public selectedRating = undefined;
  
  public selectedGenres: Genre[] = [];

  public searchQuery = '';
  
  public dates: Date[] | undefined;
  public minYear: Date = new Date(1950, 0, 1); 
  public maxYear: Date = new Date(); 


  public searchParams: MovieSearchParams = {};

  constructor(
    private imdbService: IMDbService
  ){}

  genres = [ 
    { name: 'Action', value: 'action' },
    { name: 'Comedy', value: 'comedy' },
    { name: 'Drama', value: 'drama' },
    { name: 'Horror', value: 'horror' },
  ]; //TODO: Remove this mock data and get the genres from the API

  cards: BaseCard[] = [];

  getMovies(): void {
    this.imdbService.getMovies(this.searchParams).subscribe((response: any) => {
      const newCards: BaseCard[] = response.movies.map((movie: any) => ({
        id: movie._id,
        title: movie.title,
        imgSource: movie.images.find((image: any) => image.is_cover === true)?.url,
        numericValue: movie.release_year,
        type: 'movie'
      }));      
      this.cards = newCards;      
      console.log(response);  
      

      this.totalMovies = response.totalMovies;
      this.pagination = response.limit;      
    });
  }

  handlePageChange(event: PaginatorState): void {
    this.searchParams.page = (event.page || 0) + 1 ;
    this.getMovies()
  }

  handleGenreChange(event: any) {
    if (this.selectedGenres.length === 0) {
      delete this.searchParams.genre;
    } else {
      this.selectedGenres.forEach((genre) => {
        this.searchParams.genre = this.selectedGenres.map((genre) => genre.name);
      });
    }    
    this.getMovies();
  }

  handleRatingChange(event: any) {
    if (event === null) {      
      delete this.searchParams.rating;
    } else {
      this.searchParams.rating = event;
    }
    this.getMovies();
  }

  handleSearch(event: any) {    
    if (this.searchQuery.length <= 3) {
      delete this.searchParams.title;
    } else{      
      this.searchParams.title = this.searchQuery;
    }
    this.getMovies();
  }

  handleYearChange(event: any) {
    if(this.dates && this.dates[0] && this.dates[1]){
      this.searchParams.year_start = this.dates[0].getFullYear();
      this.searchParams.year_end = this.dates[1].getFullYear();
      this.getMovies();
    } else if (event === undefined) {
      delete this.searchParams.year_start;
      delete this.searchParams.year_end;
      this.getMovies();
    } 
  }
  
  ngOnInit(): void{
    this.getMovies();
  }

  public userAuth(): boolean {
    return this.imdbService.checkUserAdmin();
  }
}
