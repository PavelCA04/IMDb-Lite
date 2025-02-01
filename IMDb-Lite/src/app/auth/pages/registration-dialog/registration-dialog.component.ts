import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { IMDbService } from '../../../IMDb/services/imdb.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-registration-dialog',
  imports: [Dialog, ButtonModule, InputTextModule, SelectModule, FormsModule, FloatLabelModule, CommonModule, ToastModule],
  templateUrl: './registration-dialog.component.html',
  styleUrl: './registration-dialog.component.scss',
  providers: [MessageService]
})
export class RegistrationDialogComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private registrationService: IMDbService, private messageService: MessageService) {}

  get isFormInvalid(): boolean {
    return !this.name.trim() || !this.email.trim() || !this.password.trim();
  }
  /*
  selectedRole: any;
  roles = [
    { label: 'User', value: 'user' },
    { label: 'Administrator', value: 'admin' }
  ];*/

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  
  showDialog() {
    this.visible = true;
    this.visibleChange.emit(this.visible);
  }
  

  register() {
    console.log('register', this.name, this.email, this.password);
    /*
    if (this.isFormInvalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'All fields are required.' });
      return;
    }

    this.registrationService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration successful!' });
        this.resetForm();
        this.closeDialog();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Registration failed. Try again.' });
      }
    });*/
  }

  private resetForm() {
    this.name = '';
    this.email = '';
    this.password = '';
  }
}

