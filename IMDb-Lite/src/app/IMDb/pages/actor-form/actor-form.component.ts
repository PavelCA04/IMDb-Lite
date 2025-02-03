import { Component } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { MainHeaderComponent } from "../../shared/main-header/main-header.component";
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { Actor, Movie, MovieInformation } from '../../interfaces/imdb.interfaces';
import { IMDbService } from '../../services/imdb.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-actor-form',
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
    CommonModule
  ],
  templateUrl: './actor-form.component.html',
  styleUrl: './actor-form.component.scss',
  providers: [MessageService]
})
export class ActorFormComponent {

  public id: string = '';
  public images: string[] = [];
  public urls: string[] = [];
  public edit: boolean = false;
  public formMode: 'new' | 'edit' = 'new';
  public items: any[] = [];
  public value: any = [];

  private params: any = {};

  public actorForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    birthDate: new FormControl<Date | undefined>(undefined),
    biography: new FormControl<string>(''),
    movies: new FormControl<string[]>([]),
    mainImageUrl: new FormControl<string>(''),
    newUrl: new FormControl<string>(''),
  });

  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private imdbService: IMDbService
  ) { }

  public ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }

    this.edit = true;
    this.formMode = 'edit';
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.getActor();
  }

  public onGalleryUpload(event: FileUploadEvent): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Gallery uploaded successfully' });

    const uploadedFiles: File[] = event.files || [];
    const currentGallery = this.actorForm.get('gallery')?.value || [];
    this.actorForm.patchValue({ gallery: [...currentGallery, ...uploadedFiles] });
  }

  public onMainImageUpload(event: FileUploadEvent): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Main image uploaded successfully' });

    const uploadedFile: File = event.files[0] || null;
    this.actorForm.patchValue({ mainImage: uploadedFile.name });
  }

  public movieSuggestions: MovieInformation[] = [];

  public search(event: AutoCompleteCompleteEvent) {
    let _items: MovieInformation[] = [];

    this.imdbService.getMovies({ limit: 10, title: event.query }).subscribe((response: any) => {
      _items = response.movies.map((movie: any) => ({
        movie_id: movie._id,
        title: movie.title,
      }));
      this.items = _items;
    });
  }

  public onSubmit(): void {
    if (this.value.length > 0 || this.validations()) {
      this.params.movies = this.value.map((movie: any) => ({
        movie_id: movie.movie_id
      }));
    }
    if (this.actorForm.get('name') || this.validations()) {
      this.params.name = this.actorForm.get('name')?.value;
    }
    if (this.actorForm.get('birthDate') || this.validations()) {
      this.params.birth_date = this.actorForm.get('birthDate')?.value;
    }
    if (this.actorForm.get('biography') || this.validations()) {
      this.params.biography = this.actorForm.get('biography')?.value;
    }
    if (this.urls.length > 0 || this.validations()) {
      this.params.images = this.urls.map(url => ({ url, is_profile: false }));
      this.params.images.push({ url: this.actorForm.get('mainImageUrl')?.value, is_profile: true });
    }

    if (this.formMode === 'new') {
      this.addActor();
    } else if (this.formMode === 'edit') {
      this.updateActor();
    }
  }

  public addActor(): void {
    if (this.value.length > 0) {
      this.params.movies = this.value.map((movie: any) => ({
        movie_id: movie.movie_id
      }));
    }
    console.log('Params', this.params);
    console.log('Value', this.value);
    
    this.imdbService.addActor(this.params).subscribe(actor => {
      if (actor) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Actor submitted successfully!' });
        this.router.navigate(['/actors']);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Fail', detail: 'Invalid, please complete all required fields.' });
      }
    });
  }

  public updateActor(): void {
    console.log('Params', this.params);
    this.imdbService.updateActor(this.id, this.params).subscribe(actor => {
      console.log('Actor', actor);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Actor submitted successfully!' });
      this.router.navigate(['/actors']);
    });
    //this.router.navigate(['/actors', this.id]);
  }

  public getActor() {
    this.imdbService.getActorById(this.id).subscribe(actor => {
      this.actorForm.patchValue({ mainImage: actor?.images.find((image: any) => image.is_profile === true)?.url || undefined });
      this.actorForm.patchValue({ name: actor?.name || '' });
      this.actorForm.patchValue({ birthDate: actor?.birth_date || undefined });
      this.actorForm.patchValue({ biography: actor?.biography || '' });
      this.urls = actor?.images
        .filter((image: any) => image.is_profile === false)
        .map((image: any) => image.url) || [];

      this.value = actor?.movies.map(movie => {
        return {
          movie_id: movie.movie_id,
          title: movie.title
        }
      }) || [];

      let mainImageUrl = actor?.images.find((image: any) => image.is_profile === true)?.url || null;
      this.actorForm.patchValue({ mainImageUrl: mainImageUrl || '' });
      console.log('Main Image', this.actorForm.get('mainImage')?.value);


      this.images = actor?.images
        .filter((image: any) => image.is_cover !== true)
        .map((image: any) => image.url) || [];
    });
  }

  public addUrl() {
    const newUrl = this.actorForm.get('newUrl')?.value;
    if (newUrl) {
      this.urls.push(newUrl);
      this.actorForm.get('newUrl')?.reset();
    }
  }

  public validations(): boolean {
    if (this.edit) {
      return false;
    } else if (
      this.actorForm.get('name')?.value
      && this.actorForm.get('birthDate')?.value
      && this.actorForm.get('biography')?.value
    ) {
      return false;
    }
    return true;
  }

  removeUrl(index: number) {
    this.urls.splice(index, 1);
  }
}
