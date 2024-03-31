import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenExpirationDialogComponent } from './token-expiration-dialog.component';

describe('TokenExpirationDialogComponent', () => {
  let component: TokenExpirationDialogComponent;
  let fixture: ComponentFixture<TokenExpirationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenExpirationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TokenExpirationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
