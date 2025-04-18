import { Routes } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { authGuard } from '../../core/guards/auth/auth.guard';

export const routes: Routes = [
    {
        path:'dashboard', component:SidebarComponent, canActivateChild:[authGuard], children:[
            
        ]
    }
];
