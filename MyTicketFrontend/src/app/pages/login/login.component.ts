import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import{MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { AuthenticationRequest } from '../../model/authRequest.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatInputModule,MatIconModule,FormsModule, CommonModule,ReactiveFormsModule],
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
  isSuccess=true;

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
    this.loginService.login(authRequest).subscribe(response => {
      console.log('Authentication is successful:',response); 
      console.log('Access Token:', response["access_token"]);
      localStorage.setItem("access_token",response["access_token"]);
     
      this.showWrongCredentials = false;
      this.router.navigateByUrl("");
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