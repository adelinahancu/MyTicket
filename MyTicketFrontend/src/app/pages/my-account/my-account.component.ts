import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../model/userDto.model';
import { Router, RouterModule } from '@angular/router';
import { Ticket } from '../../model/ticket.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { MatCardModule } from '@angular/material/card';
import { FavoriteEventsService } from '../../services/favorite-events.service';
import { Eveniment } from '../../model/eveniment.model';
import { EventService } from '../../services/event.service';
import { TransactionSreviceService } from '../../services/transaction.service';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,MatCardModule,DatePipe,RouterModule],
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
  favoriteEventIds:number[]=[];
  favoriteEvents:Eveniment[]=[];
  transactions:any[]=[];

  constructor(private userService:UserService,private router:Router,private formBuilder:FormBuilder,private ticketService:TicketService,private favoriteEventsService:FavoriteEventsService,private eventService:EventService,private transactionService:TransactionSreviceService){}

  


  
  ngOnInit(): void {

    this.updateUserForm=this.formBuilder.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      
    })
    this.showProfile();
   // this.getUsersTickets(this.userDto.email);
   // this.showTickets();
   const favoriteEventIdsFromStorage = localStorage.getItem('favoriteEventIds');
    if (favoriteEventIdsFromStorage) {
      this.favoriteEventIds = JSON.parse(favoriteEventIdsFromStorage);
    }

    // Fetch favorite events
    this.fetchFavoriteEvents();
 
  
    
    
  }
  fetchFavoriteEvents(): void {
    // Fetch details for each favorite event
    this.favoriteEventIds.forEach((eventId) => {
      this.eventService.getEventById(eventId).subscribe(
        (event: Eveniment) => {
          // Add fetched event to favoriteEvents array
          this.favoriteEvents.push(event);
        },
        (error) => {
          console.error(`Error fetching event with ID ${eventId}:`, error);
        }
      );
    });
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

  showFavorites():void{
    this.selectedItem='Favorite';
    console.log(this.favoriteEventIds);
  }

  showTransactionHistory(): void {
    this.selectedItem = 'Istoric tranzactii';
    this.transactionService.getTransactions().subscribe(
      transactions=>{
        this.transactions=transactions;
        console.log('Transactions:',transactions);
      },
      error=>{
        console.error('Error fethcing transactions:',error)
      }
    )
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

  getUsersTickets(email:String):void{
   console.log("showing tickets");
    if(this.userDto ){
      this.selectedItem="Bilete"
     
    console.log(this.userDto.email);
    this.ticketService.getUsersTicketsSortedByEmail(this.userDto.email).subscribe(
      (tickets:Ticket[])=>{
        
        this.tickets=tickets;
        console.log(this.tickets);
      },
      error=>{
        console.error(error);
      }
    );
  }else{
    this.selectedItem="Bilete"
  }
}

openTicketPdf(ticketId:number):void{
  this.ticketService.downloadTicketPdf(ticketId).subscribe(
    (response:Blob)=>{
      const blobUrl=window.URL.createObjectURL(response);
      window.open(blobUrl,'_blank');
      window.URL.revokeObjectURL(blobUrl);
    },
    (error)=>{
      console.error('Error generating ticket pdf:',error);
    }
  );
}
isFavorite(event: Eveniment): boolean {
  return this.favoriteEventIds.includes(event.id);
}

toggleFavorite(event: Eveniment,eveniment:Event): void {
  eveniment.stopPropagation();
  const index=this.favoriteEventIds.indexOf(event.id);
  if(index===-1){
    this.favoriteEventIds.push(event.id);
  }else {
    this.favoriteEventIds.splice(index, 1);
  }
  localStorage.setItem('favoriteEventIds', JSON.stringify(this.favoriteEventIds));
  console.log(this.favoriteEventIds);
}



}
