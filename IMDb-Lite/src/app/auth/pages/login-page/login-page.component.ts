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
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder, 
    private messageService: MessageService, 
    private loginService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    console.log('onLogin', this.loginForm.value);
    
    if (this.loginForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill in all fields.' });
      return;
    }

    const { email, password } = this.loginForm.value;

    this.loginService.logIn({email, password}).subscribe({
      next: (response: any) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful!' });
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000)
        
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid email or password.' });
        console.error('Login failed:', err);
      }
    });
  }

  showRegistrationDialog() {
    console.log('showRegistrationDialog');
    this.isRegistrationDialogVisible = true;
  }

}

