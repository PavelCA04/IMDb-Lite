import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { IMDbService } from '../../../IMDb/services/imdb.service';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-login-page',
  imports: [CardModule, ButtonModule, InputTextModule, FloatLabelModule, ReactiveFormsModule, RegistrationDialogComponent, DialogModule, CommonModule, ToastModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  providers: [MessageService]
})
export class LoginPageComponent {
  loginForm: FormGroup;
  isRegistrationDialogVisible: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService, private loginService: IMDbService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    console.log('onLogin', this.loginForm.value);
    /*
    if (this.loginForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill in all fields.' });
      return;
    }

    const { username, password } = this.loginForm.value;

    this.loginService.login(username, password).subscribe({
      next: (response: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful!' });
        console.log('User logged in:', response);
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid username or password.' });
        console.error('Login failed:', err);
      }
    });*/
  }

  showRegistrationDialog() {
    console.log('showRegistrationDialog');
    this.isRegistrationDialogVisible = true;
  }

}

