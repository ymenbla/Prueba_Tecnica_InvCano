import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '@auth/index';


@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule,
    MatProgressSpinner
],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snack = inject(MatSnackBar);

  loading = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading.set(true);

    this.authService.login(this.loginForm.value as LoginRequest).subscribe({
      next: () => {
        this.snack.open('Autenticacion exitosa', 'OK', { duration: 3000 });
        this.router.navigateByUrl('/app'); // va al layout principal
      },
      error: () => {
        this.snack.open('Credenciales inválidas', 'Close', { duration: 3000 });
        this.loading.set(false)
      },
      complete: () => this.loading.set(false)
    });
  }

}
