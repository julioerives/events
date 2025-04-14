import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private element: HTMLElement = document.getElementById('loading') as HTMLElement;
  constructor() { }

  showLoading(): void{
    this.element.style.display = 'flex';
  }
  hideLoading(): void {
    this.element.style.display = 'none';
  }



}
