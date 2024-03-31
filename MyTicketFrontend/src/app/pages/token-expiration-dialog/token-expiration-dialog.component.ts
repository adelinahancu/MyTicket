import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../../services/token.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenExporationService } from '../../services/token-expiration.service';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';


@Component({
  selector: 'app-token-expiration-dialog',
  standalone: true,
  imports: [AsyncPipe,CommonModule],
  templateUrl: './token-expiration-dialog.component.html',
  styleUrl: './token-expiration-dialog.component.css'
})
export class TokenExpirationDialogComponent {
  timeRemaining:Observable<number>;

  constructor(
    private tokenService:TokenService,
    private tokenExpirationService:TokenExporationService,
    private dialogRef:MatDialogRef<TokenExpirationDialogComponent>,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data:any){
      this.timeRemaining=data.timeRemaining
    }
  
    refreshToken(): void {
      this.tokenService.refreshToken().subscribe(
        data => {
          console.log(data);
          this.tokenExpirationService.clearTimer();
        },
        error => {
          console.error(error);
        }
      )
      this.dialogRef.close();
    }

    logout() {
      this.tokenExpirationService.clearTimer();
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('REFRESH_TOKEN');
      this.dialogRef.close();
      window.location.href = '/login';
    }
  

}
