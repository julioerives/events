import { Component } from '@angular/core';
import { CreatePurchasesComponent } from './create-purchases/create-purchases.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-purchases',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.scss'
})
export class PurchasesComponent {

}
