import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'', loadChildren: ()=> import("./components/auth/auth.routes").then(r => r.authRoutes)
    },
    {
        path:'', loadChildren:()=> import('./layout/sidebar/sidebar.router').then(r => r.routes)
    }
];
