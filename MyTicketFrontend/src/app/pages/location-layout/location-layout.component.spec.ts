import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationLayoutComponent } from './location-layout.component';

describe('LocationLayoutComponent', () => {
  let component: LocationLayoutComponent;
  let fixture: ComponentFixture<LocationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
