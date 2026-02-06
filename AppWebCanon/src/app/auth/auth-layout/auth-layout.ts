import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-auth-layout',
  imports: [
    RouterOutlet,
    MatCardModule, MatTabsModule, MatIconModule,
  ],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {
  private router = inject(Router);

  selectedIndex = signal(0);

  constructor() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.syncTabWithRoute();
      });

    this.syncTabWithRoute();
  }

  onTabChange(index: number) {

    this.selectedIndex.set(index);

    if (index === 0) {
      this.router.navigate(['/auth/login']);
    } else if (index === 1) {
      this.router.navigate(['/auth/register']);
    }
  }

  private syncTabWithRoute() {
    const url = this.router.url;

    if (url.includes('register')) {
      this.selectedIndex.set(1);
    } else {
      this.selectedIndex.set(0);
    }
  }
}
