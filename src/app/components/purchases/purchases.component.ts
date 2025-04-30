import { Component } from '@angular/core';
import { CreatePurchasesComponent } from './create-purchases/create-purchases.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchases',
  imports: [
    CommonModule,
    CreatePurchasesComponent
  ],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.scss'
})
export class PurchasesComponent {

}
