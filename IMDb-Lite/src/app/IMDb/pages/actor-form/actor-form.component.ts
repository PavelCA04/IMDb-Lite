import { Component } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { MainHeaderComponent } from "../../shared/main-header/main-header.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-actor-form',
  imports: [MainHeaderComponent, RatingModule, FormsModule, StepperModule, ButtonModule, ReactiveFormsModule,
    InplaceModule, DatePickerModule, TextareaModule, FileUploadModule, CommonModule, ToastModule, HttpClientModule,
    CardModule, InputTextModule, AutoCompleteModule],
  templateUrl: './actor-form.component.html',
  styleUrl: './actor-form.component.scss',
  providers: [MessageService]
})
export class ActorFormComponent {

  public uploadedFiles: any[] = [];
  public movieSuggestions: any[] = [];
  public formMode: 'new' | 'edit' = 'new';

  public actorForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    birthDate: new FormControl<Date | null>(null),
    about: new FormControl<string>(''),
    movies: new FormControl<string[]>([]),
    mainImage: new FormControl<File | null>(null),
    gallery: new FormControl<File[]>([])
  });

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;                                                                             // not in edit mode, do nothing
    }
    this.formMode = 'edit';
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

  public search(event: AutoCompleteCompleteEvent): void {

  }

  public onSubmit(): void {
    if (this.actorForm.valid) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Actor submitted successfully!' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Fail', detail: 'Invalid, please complete all required fields.' });
    }
  }

}
