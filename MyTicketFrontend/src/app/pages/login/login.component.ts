import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import{MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { AuthenticationRequest } from '../../model/authRequest.model';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatStepperModule,MatTabsModule,MatInputModule,MatIconModule,FormsModule, CommonModule,ReactiveFormsModule,NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  email: string = '';
  password = '';
  errorMessage = '';
  showWrongCredentials = false;
  hide=true;
  isFormSubmitted=false;

  loginForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)])
  });

  get passwordInput() { return this.loginForm.get('password'); }  

  constructor(private loginService:UserService,private router:Router,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.showWrongCredentials=false;
    
  }

  login():void{
    console.log("email: ", this.email);
    const authRequest= new AuthenticationRequest(this.email,this.password);
    this.loginService.login(authRequest).subscribe((response: any) => {
      console.log('Authentication is successful:',response); 
      localStorage.setItem("jwt",response.accesToken);
      this.showWrongCredentials = false;
    },
    (error)=>{
      console.error('Authentication failed:',error);
      this.showWrongCredentials = true;
      this.errorMessage = error.error.message;
    });
    
  }

  onSubmit(){
    this.login();
    this.isFormSubmitted=true;
    
  }

  navigateToRegistration(){
    this.router.navigate(['/registration']);
  }



 

}
