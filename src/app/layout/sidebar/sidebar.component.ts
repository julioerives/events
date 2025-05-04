import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
interface MenuItem {
  text: string;
  icon: string;
  active: boolean;
  badge: string | null;
  path: string;
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
export class SidebarComponent implements OnInit {

  private _router: Router = inject(Router);
  public isCollapsed = true;
  public isSidebarVisible = true;

  public menuItems: MenuItem[] = [
    { text: 'Events', path: 'dashboard/events', icon: 'notifications', active: false, badge: null },
    { text: 'Calendar', path: 'dashboard/calendar', icon: 'calendar_today', active: false, badge: null },
    { text: 'Purchases', path: 'dashboard/purchases', icon: 'shopping_cart', active: false, badge: null },

  ];

  ngOnInit(): void {
    this.loadRedirectsPaths()
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  loadRedirectsPaths() {
    this.menuItems = this.menuItems.map(m => {
      return { ...m, active: this.isPathOn(m.path) }
    })
  }

  activateItem(selectedItem: MenuItem) {
    this.menuItems = this.menuItems.map(item => ({
      ...item,
      active: item.text === selectedItem.text
    }));
    this._router.navigateByUrl(selectedItem.path);
  }

  isPathOn(path: string): boolean {
    return location.href.includes(path)
  }



  onContentClick() {
    this.isCollapsed = true;
  }


}
