import { Routes } from "@angular/router";
import { PurchasesComponent } from "./purchases.component";
import { CreatePurchasesComponent } from "./create-purchases/create-purchases.component";

export const routes: Routes = [
    {
        path: '', component: PurchasesComponent
    },
    {
        path: 'createPurchase', component: CreatePurchasesComponent
    }
];