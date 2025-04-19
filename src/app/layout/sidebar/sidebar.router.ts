import { Routes } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { authGuard } from '../../core/guards/auth/auth.guard';
import { EventsComponent } from '../../components/events/events.component';

export const routes: Routes = [
    {
        path:'', component:SidebarComponent, canActivateChild:[authGuard], children:[
            {
                path: 'events', component: EventsComponent
            },
            {
                path: '', redirectTo: 'events', pathMatch: 'full'
            }
        ]
    }
];
