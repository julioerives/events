import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getErrorClass } from '../../../helpers/formFunctions';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../data/services/auth/auth.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Login } from '../../../data/models/auth/auth.model';
import { LoadingService } from '../../../core/loading/loading.service';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
  form!: FormGroup;
  isSend: boolean = false;
  loading: boolean = false;
  private destroy$: Subject<void> = new Subject<void>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private laodingService: LoadingService
  ) {
    this.buildForm()
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.next()
  }

  buildForm() {
    this.form = this.fb.group({
      email: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.email]),
      password_hash: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.minLength(6)])
    });
  }

  getErrorClass(control: string) {
    return getErrorClass(control, this.form, this.isSend)
  }

  onSubmit() {
    if (!this.form.valid) {
      alert('Datos invalidos')
      return;
    }
    this.laodingService.showLoading();
    const data = this.form.value as Login;
    this.authService.register(data).pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this.laodingService.hideLoading()
      })
    ).subscribe(
      {
        next: (d) => {
          alert(d.message)
        },
        error: (e) => {

        }
      }
    )
  }
}
