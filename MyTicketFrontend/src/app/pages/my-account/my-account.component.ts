import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../model/userDto.model';
import { Router } from '@angular/router';
import { Ticket } from '../../model/ticket.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent implements OnInit {

  userDto:UserDto=new UserDto();
  user:User;
  tickets: Ticket[];
  selectedItem:string;
  updateUserForm:FormGroup;
  isSuccessful=false;

  constructor(private userService:UserService,private router:Router,private formBuilder:FormBuilder){}

  


  
  ngOnInit(): void {

    this.updateUserForm=this.formBuilder.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      
    })
    this.showProfile();
    
    
  }

  getUserInfo():void{
    console.log('started to retrieve user info');
    this.userService.getUserInfo().subscribe(
      (userDto:UserDto)=>{
        this.userDto=userDto;
        
       
        console.log('user info retrieved:',this.userDto);
        
      },
      (error)=>{
        console.error('Error retrieving user info:',error);
      }
    );
  }

  updateUserInfo():void{
    if (this.updateUserForm.valid){
    const updatedUserDto:UserDto={
      firstname:this.updateUserForm.value.firstname,
      lastname: this.updateUserForm.value.lastname,
      email: this.updateUserForm.value.email,
      role: this.userDto.role, 
      tickets: this.userDto.tickets
    }
    this.userService.updateUserInfo(updatedUserDto).subscribe(
      (response)=>{
        console.log('User info updated successfully',response);
        this.userDto = updatedUserDto;
      },
      (error)=>{
        console.error('Error updating user info:', error);
      }
    );}else{
      console.error('Form is invalid.Connot submit.');
    }
  }

  showTickets():void{
    console.log('Showing tickets...');
   
    if(this.userDto && this.userDto.tickets && this.userDto.tickets.length > 0){
      this.selectedItem='Bilete';
      
      this.tickets=this.userDto.tickets;
      console.log('Tickets:', this.tickets);
      }else{
        this.selectedItem='Bilete';
        console.warn('User tickets are not available');
      }
  }

  showFavorites():void{
    this.selectedItem='Favorite';
  }

  showTransactionHistory(): void {
    this.selectedItem = 'Istoric tranzactii';
    // Implement logic to fetch and display transaction history
  }

  showProfile(): void {
    this.selectedItem = 'Profil';
    this.userService.getUserInfo().subscribe(
      (userDto:UserDto)=>{
        this.userDto=userDto;
        this.updateUserForm.patchValue({
          firstname:userDto.firstname,
          lastname:userDto.lastname,
          email:userDto.email
        });
      },
      (error)=>{
        console.error('Error retrieving user info',error);
      }
    );
  }


  logout(event:Event){
    event.preventDefault();

    this.userService.logout().subscribe(
      response=>{
        console.log(response);
        localStorage.removeItem('access_token');
        
        this.router.navigate(['/login']);
    
      },
      error=>{
        console.error(error);
      }
    );
  }

 


}
