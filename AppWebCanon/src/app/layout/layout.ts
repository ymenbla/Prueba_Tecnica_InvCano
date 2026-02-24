import { Component, DestroyRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Sidenav } from "./components/sidenav/sidenav";
import { filter, map, Subscription, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Notifications } from "./components/notifications/notifications";
import { UserMenu } from './components/user-menu/user-menu';

interface TopInfo {
  icon?: string;
  title: string;
  description?: string;
}

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    Sidenav,
    Notifications,
    UserMenu
],
  styleUrl: './layout.scss',
  templateUrl: './layout.html',
})
export class Layout {

  private readonly router = inject(Router)
  private readonly  activatedRoute = inject(ActivatedRoute);

  sidebarOpen = signal(true);
  topInfo = signal<TopInfo>({
    icon: '',
    title: '',
    description: ''
  });

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.router.routerState.root;

        while (route.firstChild) {
          route = route.firstChild;
        }

        return route.snapshot.data;
      }),
      takeUntilDestroyed()
    ).subscribe(data => {
      this.topInfo.set({
        icon: data['icon'] || 'dashboard',
        title: data['title'] || 'Dashboard',
        description: data['description'] || 'Visión general de la producción'
      });
    });
  }

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
  }
}
