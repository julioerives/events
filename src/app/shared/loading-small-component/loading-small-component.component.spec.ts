import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSmallComponentComponent } from './loading-small-component.component';

describe('LoadingSmallComponentComponent', () => {
  let component: LoadingSmallComponentComponent;
  let fixture: ComponentFixture<LoadingSmallComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSmallComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingSmallComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
