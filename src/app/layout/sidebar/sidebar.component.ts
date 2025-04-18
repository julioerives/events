import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
interface MenuItem {
  text: string;
  icon: string;
  active: boolean;
  badge: string | null;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterOutlet,
    MatIconModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isCollapsed = true;
  isSidebarVisible = true;

  menuItems: MenuItem[] = [
    { text: 'Events', icon: 'notifications', active: false, badge: null },
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  activateItem(selectedItem: MenuItem) {
    this.menuItems = this.menuItems.map(item => ({
      ...item,
      active: item.text === selectedItem.text
    }));
  }



  onContentClick() {
    this.isCollapsed = true;
  }


}
