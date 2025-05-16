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
  submenu?: SubMenuItem[];
  submenuOpen?: boolean;
}

interface SubMenuItem {
  text: string;
  icon: string;
  active: boolean;
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
    {
      text: 'Events',
      path: 'dashboard/events',
      icon: 'notifications',
      active: true,
      badge: null
    },
    {
      text: 'Catalogos',
      path: '',
      icon: 'list_alt',
      active: false,
      badge: null,
      submenuOpen: false,
      submenu: [
        {
          text: 'Productos',
          path: 'dashboard/products',
          icon: 'inventory_2',
          active: false
        },
        {
          text: 'Tipos de Producto',
          path: 'dashboard/product-types',
          icon: 'category',
          active: false
        }
      ]
    },
    {
      text: 'Calendar',
      path: 'dashboard/calendar',
      icon: 'calendar_today',
      active: false,
      badge: null
    },
    {
      text: 'Purchases',
      path: 'dashboard/purchases',
      icon: 'shopping_cart',
      active: false,
      badge: null
    },
  ];

  toggleSubmenu(item: MenuItem): void {
    if (this.isCollapsed) return;
    item.submenuOpen = !item.submenuOpen;
    this.menuItems.forEach(i => {
      if (i !== item && i.submenuOpen) {
        i.submenuOpen = false;
      }
    });
  }

  activateSubItem(parentItem: MenuItem, subItem: SubMenuItem): void {
    this.menuItems.forEach(item => {
      item.active = false;
      if (item.submenu) {
        item.submenu.forEach(sub => sub.active = false);
      }
    });
    subItem.active = true;
    parentItem.active = true;
    this._router.navigateByUrl(subItem.path);
  }

  loadRedirectsPaths() {
    this.menuItems = this.menuItems.map(m => {
      const active = this.isPathOn(m.path);
      let submenuActive = false;
      if (m.submenu) {
        m.submenu = m.submenu.map(sub => {
          const subActive = this.isPathOn(sub.path);
          if (subActive) submenuActive = true;
          return { ...sub, active: subActive };
        });
      }

      return {
        ...m,
        active: active || submenuActive,
        submenuOpen: submenuActive ? true : m.submenuOpen
      };
    });
  }

  ngOnInit(): void {
    this.loadRedirectsPaths()
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
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
