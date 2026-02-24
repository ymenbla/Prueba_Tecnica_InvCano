import { Component, computed, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from "@angular/material/icon";
import { DatePipe } from '@angular/common';

interface Notification {
  id: number;
  title: string;
  message: string;
  date: Date;
  read: boolean;
}

@Component({
  selector: 'app-notifications',
  imports: [
    MatMenuModule, MatBadgeModule, MatListModule,
    MatDividerModule, MatButtonModule, MatIcon,
    DatePipe
],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss',
})
export class Notifications {
  notifications = signal<Notification[]>([
    {
      id: 1,
      title: 'Nuevo mensaje',
      message: 'Tienes un mensaje nuevo',
      date: new Date(),
      read: false
    },
    {
      id: 2,
      title: 'Sistema',
      message: 'Actualización completada',
      date: new Date(),
      read: true
    }
  ]);

  unreadCount = computed(() =>
    this.notifications().filter(n => !n.read).length
  );

  markAsRead(id: number) {
    this.notifications.update(list =>
      list.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  }
}
