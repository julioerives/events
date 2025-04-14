import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getErrorClass } from '../../../helpers/formFunctions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form!: FormGroup;
  isSend: boolean = false;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder
  ){
    this.buildForm()
  }

  buildForm(){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  getErrorClass(control: string) {
    return getErrorClass(control, this.form, this.isSend)
  }

  onSubmit(){

  }
}
