import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
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

    // this.auth.login(this.loginForm.value as any).subscribe({
    //   next: () => {
    //     this.snack.open('Login successfully', 'OK', { duration: 2000 });
    //     this.router.navigateByUrl('/'); // va al layout principal
    //   },
    //   error: () => {
    //     this.snack.open('Credential Invalid', 'Close', { duration: 3000 });
    //     this.loading.set(false)
    //   },
    //   complete: () => this.loading.set(false)
    // });
  }

}
