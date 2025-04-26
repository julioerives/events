import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getErrorClass } from '../../../helpers/formFunctions';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../data/services/auth/auth.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Login } from '../../../data/models/auth/auth.model';
import { LoadingService } from '../../../core/loading/loading.service';
import { Router, RouterModule } from '@angular/router';
import { AlertsService } from '../../../core/alerts/alerts.service';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy, OnInit {
  form!: FormGroup;
  isSend: boolean = false;
  loading: boolean = false;
  private destroy$: Subject<void> = new Subject<void>;


  private _fb: FormBuilder = inject(FormBuilder);
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _loadingService: LoadingService = inject(LoadingService);
  private _alertService: AlertsService = inject(AlertsService);

  ngOnInit(): void {
    this.buildForm()
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.next()
  }

  buildForm() {
    this.form = this._fb.group({
      email: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.email]),
      password_hash: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.minLength(6)])
    });
  }

  getErrorClass(control: string) {
    return getErrorClass(control, this.form, this.isSend)
  }

  onSubmit() {
    if (!this.form.valid) {
      this._alertService.info('Formulario inválido');
      return;
    }
    this._loadingService.showLoading();
    const data = this.form.value as Login;
    this._authService.register(data)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loadingService.hideLoading()
        }))
      .subscribe(
        {
          next: (d) => {
            this._alertService.success(d.message)
            this._router.navigate(['/dashboard']);
          },
          error: (e) => {
            this._alertService.error(e.error.message);
          }
        }
      )
  }
}
