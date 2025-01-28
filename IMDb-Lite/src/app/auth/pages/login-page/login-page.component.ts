import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-login-page',
  imports: [CardModule, ButtonModule, InputTextModule, FloatLabelModule, ReactiveFormsModule, RegistrationDialogComponent, DialogModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loginForm: FormGroup;
  isRegistrationDialogVisible: boolean = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Login successful:', { username, password });
    } else {
      console.error('Form is invalid');
    }
  }

  showRegistrationDialog() {
    console.log('showRegistrationDialog');
    this.isRegistrationDialogVisible = true;
  }

}

