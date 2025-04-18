import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../data/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { getErrorClass } from '../../../helpers/formFunctions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class LoginComponent  {
  form!: FormGroup;
  public loading = false;
  private isSend = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.buildForm()
  }

  buildForm(){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password_hash: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        alert('Credenciales incorrectas');
      }
    });
  }

  getErrorClass(control: string){
    return getErrorClass(control, this.form, this.isSend)
  }
}