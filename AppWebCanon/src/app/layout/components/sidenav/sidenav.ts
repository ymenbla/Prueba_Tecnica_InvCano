import { Component } from '@angular/core';
import { MatListModule } from "@angular/material/list";
import { MatExpansionPanel, MatExpansionPanelHeader } from "@angular/material/expansion";
import { MatIcon } from "@angular/material/icon";
import { RouterModule } from '@angular/router';

interface MenuItem {
  id: number;
  label: string;
  icon: string;
  route: string;
  badge?: BadgeType;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  id: number;
  label: string;
  route: string;
  badge?: BadgeType;
}

type BadgeType = 'new' | 'updated';

enum BadgeTypeEnum {
  New = 'new',
  Updated = 'updated'
}



@Component({
  selector: 'app-sidenav',
  imports: [
    RouterModule,
    MatListModule,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatIcon
  ],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  menuItems: MenuItem[] = [
    // { id: 1, label: 'Métricas', icon: 'home', route: '/', badge: 'new', submenu: [
    //   { id: 11, label: 'Métricas Generales', route: '/app/metrics' },
    // ]},
    { id: 1, label: 'Telares', icon: 'precision_manufacturing', route: '/app/machines' },
    { id: 2, label: 'Producción Diaria', icon: 'trolley', route: '/app/daily-production' },
    { id: 3, label: 'Métricas', icon: 'bar_chart', route: '/app/metrics' },
  ];

}
