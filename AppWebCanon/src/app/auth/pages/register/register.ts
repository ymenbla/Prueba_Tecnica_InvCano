import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../types/registerRequest.interface';
import { passwordMatchValidator } from './validators/passwordMatchValidator';
import { MatTooltip } from "@angular/material/tooltip";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@auth/index';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatDividerModule,
    MatIconModule,
    MatTooltip,
    MatProgressSpinner
],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private snack = inject(MatSnackBar);

  hide = signal(true);
  creatingAccount = signal(false);

  registerForm = this.fb.group(
    {
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [passwordMatchValidator]
    }
  );

  get f () { return this.registerForm.controls; }


  onSubmit() {
    if (this.registerForm.invalid) return;
    this.creatingAccount.set(true);

    this.authService.register(this.registerForm.value as RegisterRequest).subscribe({
      next: () => {
        this.snack.open('Registro exitoso', 'OK', { duration: 3000 });
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.snack.open('Error al registrar usuario', 'Close', { duration: 3000 });
      },
      complete: () => this.creatingAccount.set(false)
    });
  }

  togglePasswordVisibility(event: Event) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
