import { Component, signal } from '@angular/core';
import { MatMenuModule } from "@angular/material/menu";
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from "@angular/material/divider";

interface User {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user-menu',
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIcon,
    MatDivider
],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.scss',
})
export class UserMenu {
  user = signal<User>({
    name: 'Yefry Mendoza',
    email: 'ymendoza@example.com',
    role: 'Administrador'
  });

  logout() {
    // Aquí puedes implementar la lógica de cierre de sesión
    console.log('Cerrando sesión...');
  }
}
