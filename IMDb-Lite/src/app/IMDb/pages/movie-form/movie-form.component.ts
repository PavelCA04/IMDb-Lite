import { IMDbService } from './../../services/imdb.service';
import { Component } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { MainHeaderComponent } from "../../shared/main-header/main-header.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InplaceModule } from 'primeng/inplace';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorInformation, Movie } from '../../interfaces/imdb.interfaces';
import { InputGroupModule } from 'primeng/inputgroup';
import { ChipModule } from 'primeng/chip';

interface Genre {
  name: string,
  value: string
}

@Component({
  selector: 'app-movie-form',
  imports: [
    MainHeaderComponent,
    RatingModule,
    FormsModule,
    StepperModule,
    ButtonModule,
    ReactiveFormsModule,
    InplaceModule,
    DatePickerModule,
    TextareaModule,
    FileUploadModule,
    CommonModule,
    ToastModule,
    HttpClientModule,
    CardModule,
    InputTextModule,
    AutoCompleteModule,
    InputGroupModule,
    ChipModule,
    MultiSelectModule
  ],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.scss',
  providers: [MessageService]
})
export class MovieFormComponent {

  public uploadedFiles: any[] = [];                                                       // files received for the images
  public castSuggestions: any[] = [];                                                     // cast (actors) suggestions for autocomplete
  public formMode: 'new' | 'edit' = 'new';

  public movie: Movie | undefined = undefined;
  public id: string = '';
  public urls: string[] = [];
  public items: any[] = [];
  public value: any = [];

  genreForm!: FormGroup;
  public genres: Genre[] = [];

  public movieForm: FormGroup = new FormGroup({
    title: new FormControl<string>('', Validators.required),
    release_year: new FormControl<Date | null>(null, Validators.required),
    rating: new FormControl<number>(0, Validators.required),
    description: new FormControl<string>('', Validators.required),
    genre: new FormControl<Genre[]>([]),
    cast: new FormControl<ActorInformation[]>([], Validators.required),
    mainImage: new FormControl<File | null>(null, Validators.required),
    images: new FormControl<File[] | null>(null),
    newUrl: new FormControl<string>(''),
  });

  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private imdbService: IMDbService
  ) { }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (this.router.url.includes('edit')) {
        this.formMode = 'edit';
        this.route.params.subscribe(params => {
          this.id = params['id'];
          this.getMovie();
        });
      }
    });

    this.genreForm = new FormGroup({
      selectedGenres: new FormControl<Genre[] | null>([{ name: 'Action', value: 'action' }])
    });

    this.genres = [
      { name: 'Action', value: 'action' },
      { name: 'Adventure', value: 'adventure' },
      { name: 'Animation', value: 'animation' },
      { name: 'Biography', value: 'biography' },
      { name: 'Comedy', value: 'comedy' },
      { name: 'Coming-of-Age', value: 'coming-of-age' },
      { name: 'Crime', value: 'crime' },
      { name: 'Dark Fantasy', value: 'dark-fantasy' },
      { name: 'Documentary', value: 'documentary' },
      { name: 'Drama', value: 'drama' },
      { name: 'Fantasy', value: 'fantasy' },
      { name: 'Film Noir', value: 'film-noir' },
      { name: 'Family', value: 'family' },
      { name: 'Horror', value: 'horror' },
      { name: 'Historical', value: 'historical' },
      { name: 'Mystery', value: 'mystery' },
      { name: 'Psychological', value: 'psychological' },
      { name: 'Romance', value: 'romance' },
      { name: 'Sci-Fi', value: 'sci-fi' },
      { name: 'Sport', value: 'sport' },
      { name: 'Superhero', value: 'superhero' },
      { name: 'Supernatural Fantasy', value: 'supernatural-fantasy' },
      { name: 'Suspense', value: 'suspense' },
      { name: 'Thriller', value: 'thriller' },
      { name: 'Western', value: 'western' },
      { name: 'War', value: 'war' }
    ];    
  }

  public onImagesUpload(event: FileUploadEvent): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Images uploaded successfully' });

    const uploadedFiles: File[] = event.files || [];
    const currentImages = this.movieForm.get('images')?.value || [];

    if (uploadedFiles.length > 0) {
      this.movieForm.patchValue({ images: [...currentImages, ...uploadedFiles] });
    } else {
      this.movieForm.patchValue({ images: null });
    }
  }

  public onMainImageUpload(event: FileUploadEvent): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Main image uploaded successfully' });

    const uploadedFile: File = event.files[0] || null;
    this.movieForm.patchValue({ mainImage: uploadedFile.name });
  }

  public search(event: AutoCompleteCompleteEvent): void {
    let _items: ActorInformation[] = [];

    this.imdbService.getActors({ limit: 10, name: event.query }).subscribe((response: any) => {
      _items = response.actors.map((actor: any) => ({
        actor_id: actor._id,
        actor_name: actor.name,
        character_name: ''
      }));
      this.items = _items;

    });
  }

  public onSubmit(): void {
    if (this.movieForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Fail', detail: 'Invalid, please complete all required fields.' });
      return;
    }

    const selectedGenres = this.genreForm.get('selectedGenres')?.value;

    const genreValues = selectedGenres.map((genre: Genre) => genre.value);
    this.movieForm.patchValue({ genre: genreValues });

    const movieData = this.movieForm.value;

    if (!movieData.images || movieData.images.length === 0) {
      movieData.images = null;
    }

    movieData.images = this.urls.map((url) => ({ url, is_cover: false }));
    movieData.images.push({ url: movieData.mainImage, is_cover: true });

    movieData.genre = movieData.genre.map((selectedGenre: string) => {
      const genre = this.genres.find((genre) => genre.value === selectedGenre);
      return genre ? genre.name : null;
    }).filter(Boolean);

    movieData.release_year = new Date(movieData.release_year).getFullYear();

    if (this.formMode === 'edit' && this.id) {
      movieData._id = this.id;

      this.imdbService.updateMovie(movieData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Movie updated successfully!' });
          this.router.navigate(['/movies']);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update movie.' });
        }
      });
    } else {
      this.imdbService.addMovie(movieData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Movie added successfully!' });
          this.router.navigate(['/movies']);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add movie.' });
        }
      });
    }
  }

  public getMovie() {
    this.imdbService.getMovieById(this.id).subscribe(movie => {
      this.movieForm.patchValue({ title: movie?.title || '' });
      this.movieForm.patchValue({ release_year: movie?.release_year || null });
      this.movieForm.patchValue({ rating: new Date(movie?.rating || 0) });
      this.movieForm.patchValue({ description: movie?.description || '' });
      this.movieForm.patchValue({ cast: movie?.cast || [] });
      this.movieForm.patchValue({ mainImage: movie?.images.find((image: any) => image.is_cover === true)?.url || null });
      this.urls = movie?.images
        .filter((image: any) => image.is_cover === false)
        .map((image: any) => image.url) || [];
      this.value = movie?.cast.map(movie => {
        return {
          actor_id: movie.actor_id,
          actor_name: movie.actor_name,
          character_name: movie.character_name
        }
      }) || [];

      const selectedGenres = movie?.genre.map((genreName: string) => {
        const genreObj = this.genres.find(g => g.name === genreName);
        return genreObj ? { name: genreObj.name, value: genreObj.value } : null;
      }).filter(Boolean) || [];

      this.genreForm.patchValue({ selectedGenres });
    });
  }

  public addUrl() {
    const newUrl = this.movieForm.get('newUrl')?.value;
    if (newUrl) {
      this.urls.push(newUrl);
      this.movieForm.patchValue({ newUrl: '' });
    }
  }

  public removeUrl(index: number) {
    this.urls.splice(index, 1);
  }
}
