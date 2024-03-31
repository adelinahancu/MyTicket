import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef} from  '@angular/material/dialog';
import { TokenExpirationDialogComponent } from '../pages/token-expiration-dialog/token-expiration-dialog.component';
import jwt_decode, { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class TokenExporationService {

  timeRemaining:number=0;
  showPopup:boolean=false;
  timer:any;
  dialogRef:MatDialogRef<TokenExpirationDialogComponent> |null=null;

  private remainingTimeSubject:BehaviorSubject<number>=new BehaviorSubject<number>(0);


  constructor(private dialog:MatDialog,private router:Router) { }

  initialize(){
    this.checkTokenExpiration();
    this.startTimer();

  }

  checkTokenExpiration(){
    const token=localStorage.getItem('ACCESS_TOKEN');
    if(token){
      const decodedToken:any=jwtDecode(token);
      const expirationTime=decodedToken.exp*1000;
      const currentTime=Date.now();
      const timeDifference=expirationTime-currentTime;
      this.timeRemaining=Math.ceil(timeDifference/1000);
      console.log(token);
      console.log('Token expiration:', this.timeRemaining, ' seconds remaining');

    }
  }
    startTimer(){
      this.timer=setInterval(()=>{
        this.timeRemaining--;
        this.remainingTimeSubject.next(this.timeRemaining);

        if(this.timeRemaining<=60 && this.timeRemaining>=0 && !this.showPopup){
          this.showPopup=true;
          this.openTokenExpirationDialog();
        }

        if(this.timeRemaining<=0){
          this.logout();
        }
      },1000);
    }

    openTokenExpirationDialog(){
      const dialogConfig:MatDialogConfig={
        width:'450px',
        panelClass:'centered-dialog',
        disableClose:true,
        data:{timeRemaining:this.remainingTimeSubject}
      };

      const dialogRef=this.dialog.open(TokenExpirationDialogComponent,dialogConfig);

      dialogRef.afterClosed().subscribe(result=>{
        console.log('The dialog was closed');
        this.dialogRef=null;
      });
    }

    logout(){
      this.clearTimer();
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('REFRESH_TOKEN');
      if(this.dialogRef){
        this.dialogRef.close();
      }

      window.location.href='/login';
    }

    clearTimer():void{
      clearInterval(this.timer);
    }

  }

