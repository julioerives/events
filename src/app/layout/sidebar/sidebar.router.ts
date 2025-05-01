import { Routes } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { authGuard } from '../../core/guards/auth/auth.guard';
import { EventsComponent } from '../../components/events/events.component';
import { CalendarEventComponent } from '../../components/calendar-event/calendar-event.component';
import { PurchasesComponent } from '../../components/purchases/purchases.component';

export const routes: Routes = [
    {
        path: '', component: SidebarComponent, canActivateChild: [authGuard], children: [
            {
                path: 'events', component: EventsComponent
            },
            {
                path: 'calendar', component: CalendarEventComponent
            },
            {
                path: '', redirectTo: 'events', pathMatch: 'full'
            },
            {
                path:'purchases', loadChildren: () =>  import("./../../components/purchases/purchases.router").then(m => m.routes)
            }
        ]
    }
];
