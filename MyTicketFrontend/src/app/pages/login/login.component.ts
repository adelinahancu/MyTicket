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
import { FooterComponent } from "../footer/footer.component";


@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [MatButtonModule, MatCardModule, MatInputModule, MatIconModule, FormsModule, CommonModule, ReactiveFormsModule, FooterComponent]
})
export class LoginComponent implements OnInit {

  email: string = '';
  password = '';
  errorMessage = '';
  showWrongCredentials = false;
  hide=true;
  isFormSubmitted=false;
  isSuccess=true;
  private isAdmin = false;
  

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
    
      const isAdmin = response.role === 'ADMIN';
      localStorage.setItem("isAdmin", isAdmin ? "true" : "false");
      localStorage.setItem("access_token",response["access_token"]);
      
     
      this.showWrongCredentials = false;
      if (isAdmin) {
        // Redirect admin to the dashboard
        this.router.navigateByUrl("/dashboard");
      } else {
        // Redirect regular user to the home page
        this.router.navigateByUrl("/home");
      }
    },
    (error)=>{
      console.error('Authentication failed:',error);
      this.showWrongCredentials = true;
      if (error.error && error.error.message) {
        this.errorMessage = error.error.message;
      } else {
        this.errorMessage = 'An error occurred while trying to login. Please try again later.';
      }
      
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