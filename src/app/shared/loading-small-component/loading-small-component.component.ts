import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-small-component',
  imports: [],
  templateUrl: './loading-small-component.component.html',
  styleUrl: './loading-small-component.component.scss'
})
export class LoadingSmallComponentComponent {
  @Input() textLoading: string = '';
}
