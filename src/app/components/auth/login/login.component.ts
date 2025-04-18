import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../data/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { getErrorClass } from '../../../helpers/formFunctions';
import { LoadingService } from '../../../core/loading/loading.service';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class LoginComponent  implements OnInit{
  form!: FormGroup;
  public loading = false;
  private isSend = false;

  private destroy$ = new Subject<void>();


  private _fb: FormBuilder = inject(FormBuilder);
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _loadingService: LoadingService = inject(LoadingService);

  ngOnInit(): void {
      this.buildForm
  }

  buildForm(){
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password_hash: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this._loadingService.showLoading();
    this._authService.login(this.form.value)
    .pipe(
      takeUntil(this.destroy$),
      finalize(()=>{
        this._loadingService.hideLoading()
      }))
    .subscribe({
      next: (res) => {
        this.loading = false;
        this._router.navigate(['/dashboard']);
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