import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

function passwordMatchValidator(controlName:string):ValidatorFn{

  return (control:AbstractControl):{
    [key:string]:any}|null=>{
      const passwordControl=control.root.get(controlName);
      if(passwordControl && control.value!==passwordControl.value){
        return {passwordMismatch:true};
      }

      return null;
    }
}
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [MatIcon,CommonModule,FormsModule,ReactiveFormsModule,NavbarComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})



export class RegistrationComponent {

  user:User=new User();
  isNavbarExpanded=false;
 
  

  hide=true;
  isSuccessful=false;
  isSignupFailed=false;
  errorMessage='';
  isFormSubmitted=false;

  registrationForm:FormGroup=new FormGroup({
    firstName:new FormControl('',Validators.required),
    lastName:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    confirmPassword:new FormControl('',[Validators.required,passwordMatchValidator('password')])


  }

  );

  constructor(private userService:UserService,private router:Router,private snackbar:MatSnackBar){

  }

   onNavbarExpanded(isExpanded: boolean): void {
    this.isNavbarExpanded = isExpanded;
  }
 
  
  register(){
    console.log("User: ",this.user);
    this.userService.register(this.user).subscribe(
      data=>{
        console.log(data);
        this.isSuccessful=true;
        this.isSignupFailed=false;
        const confirmationToken=data.message;
        localStorage.setItem("confirmationToken",confirmationToken);
        this.snackbar.open('Cont creat cu succes', 'Inchide', {
          duration: 3000, // Duration in milliseconds
          verticalPosition: 'top' // Position of the snackbar
        });
      },
      err=>{
        console.error(err);
        this.errorMessage=err.error.message;
        this.isSignupFailed=true;
      }
    );

  }

  onSubmit(){
    console.log('Registration is proceded');
    this.register();
    this.isFormSubmitted=true;
    this.router.navigateByUrl("/login");
    
  }
}
