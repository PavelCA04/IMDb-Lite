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
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-form',
  imports: [MainHeaderComponent, RatingModule, FormsModule, StepperModule, ButtonModule, ReactiveFormsModule,
    InplaceModule, DatePickerModule, TextareaModule, FileUploadModule, CommonModule, ToastModule, HttpClientModule,
    CardModule, InputTextModule, AutoCompleteModule
  ],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.scss',
  providers: [MessageService]
})
export class MovieFormComponent {

  public uploadedFiles: any[] = [];                                                       // files received for the gallery
  public castSuggestions: any[] = [];                                                     // cast (actors) suggestions for autocomplete
  public formMode: 'new' | 'edit' = 'new';                                                // form mode

  public movieForm: FormGroup = new FormGroup({
    title: new FormControl<string>('', Validators.required),
    releaseDate: new FormControl<Date | null>(null, Validators.required),
    rating: new FormControl<number>(0, Validators.required),
    about: new FormControl<string>('', Validators.required),
    cast: new FormControl<string[]>([], Validators.required),
    mainImage: new FormControl<File | null>(null, Validators.required),
    gallery: new FormControl<File[] | null>(null)
  });
  

  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private IMDbService: IMDbService
  ) { }

  public movieId: string | null = null;

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (this.router.url.includes('edit')) {
        this.formMode = 'edit';
        this.movieId = params.get('id'); 
        if (this.movieId) {
          this.loadMovie(this.movieId);
        }
      }
    });
  }

  private loadMovie(id: string): void {
    this.IMDbService.getMovieById(id).subscribe((movie) => {
      if (movie) {
        this.movieForm.patchValue({
          title: movie.title,
          releaseDate: new Date(movie.release_year),
          rating: movie.rating,
          about: movie.description,
          cast: movie.cast.map(c => c.actor_id), // Solo los IDs de los actores
          mainImage: movie.images.find(img => img.is_cover)?.url || null,
          gallery: movie.images.map(img => img.url) || []
        });
      }
    });
  }

  public onGalleryUpload(event: FileUploadEvent): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Gallery uploaded successfully' });
  
    const uploadedFiles: File[] = event.files || [];
    const currentGallery = this.movieForm.get('gallery')?.value || [];
  
    if (uploadedFiles.length > 0) {
      this.movieForm.patchValue({ gallery: [...currentGallery, ...uploadedFiles] });
    } else {
      this.movieForm.patchValue({ gallery: null }); 
    }
  }
  

  public onMainImageUpload(event: FileUploadEvent): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Main image uploaded successfully' });

    const uploadedFile: File = event.files[0] || null;
    this.movieForm.patchValue({ mainImage: uploadedFile.name });
  }

  public search(event: AutoCompleteCompleteEvent): void {
    this.IMDbService.getActors({ query: event.query }).subscribe((actors) => {
      this.castSuggestions = actors;
    });
  }

  public onSubmit(): void {
    if (this.movieForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Fail', detail: 'Invalid, please complete all required fields.' });
      return;
    }
  
    const movieData = this.movieForm.value;

    if (!movieData.gallery || movieData.gallery.length === 0) {
      movieData.gallery = null;
    }
  
    if (this.formMode === 'edit' && this.movieId) {
      movieData._id = this.movieId; 
      this.IMDbService.updateMovie(movieData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Movie updated successfully!' });
          this.router.navigate(['/movies']);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update movie.' });
        }
      });
    } else {
      console.log(movieData);
      this.IMDbService.addMovie(movieData).subscribe({
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
  

}
