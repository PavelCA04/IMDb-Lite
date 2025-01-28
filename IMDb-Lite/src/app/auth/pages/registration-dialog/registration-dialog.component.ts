import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration-dialog',
  imports: [Dialog, ButtonModule, InputTextModule, SelectModule, FormsModule, FloatLabelModule],
  templateUrl: './registration-dialog.component.html',
  styleUrl: './registration-dialog.component.scss'
})
export class RegistrationDialogComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  name: string = '';
  email: string = '';
  password: string = '';

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
    if (this.isFormInvalid) return;

    console.log("User Registered:", { name: this.name, email: this.email, password: this.password });

    this.name = '';
    this.email = '';
    this.password = '';

    this.closeDialog();
  }
}

