import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReatTimeSalesComponent } from './reat-time-sales.component';

describe('ReatTimeSalesComponent', () => {
  let component: ReatTimeSalesComponent;
  let fixture: ComponentFixture<ReatTimeSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReatTimeSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReatTimeSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
