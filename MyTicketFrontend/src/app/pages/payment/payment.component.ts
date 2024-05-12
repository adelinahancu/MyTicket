import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StripeService } from '../../services/stripe.service';

import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { NavigationExtras, Router } from '@angular/router';
import { Ticket } from '../../model/ticket.model';
import { User } from '../../model/user.model';
import { DataEmailRequest } from '../../model/DataEmailRequest.model';
import { Seat } from '../../model/seat.model';
import { Locatie } from '../../model/location.model';
import { UserDto } from '../../model/userDto.model';
import { Eveniment } from '../../model/eveniment.model';
import { TicketService } from '../../services/ticket.service';
import { MultipleTicketsRequest } from '../../model/multipleTicketsRequest.model';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
 event: Eveniment;
  totalAmountToPay:number;
  stripePublicKey='pk_test_51P92cMP1emHE3cOZA7zCVZRJAATQH79PyxmD7g0yjywyDstlVwVuujm74k4wSPufYHgJdN7ftTolH3tt5KFgLtVw00GoGhrAY0';
  cardDetails:any={};
  user:UserDto=new UserDto();
  fullName:String=this.user.firstname+this.user.lastname;
  selectedSeats:Seat[]=[];
  constructor(private stripeService:StripeService,private userService:UserService,private router:Router,private ticketService:TicketService){
   
  }
  chargeRequest={
    cardHolderName:'',
    email:'',
    number:null,
    expMonth:null,
    expYear:null,
    cvc:'',
    amount:0
   
  
  };
 

  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    return token !== null;
  }

  ngOnInit():void{
    if(this.isLoggedIn()){
      this.userService.getUserInfo().subscribe(
        user=>{
          this.user=user;
          this.chargeRequest.email=user.email;
        },
        error=>{
          console.error(error);
        }
      )
    }
    this.chargeRequest.amount = history.state.totalAmountToPay;
    console.log(this.totalAmountToPay)

    this.event=history.state.event;
    this.selectedSeats=history.state.selectedSeat;

    console.log(this.event);
    console.log(this.selectedSeats);
  }

  onSubmit(){
    console.log(this.chargeRequest);
    this.stripeService.charge(this.chargeRequest).subscribe({
      next:data=>{
        console.log(data);
        
        const multipleTicketsRequest:MultipleTicketsRequest={
          event:this.event,
          seats:this.selectedSeats
        };
        console.log(multipleTicketsRequest);
        this.ticketService.reserveTickets(multipleTicketsRequest).subscribe({
          next:reservedTickets=>{
            console.log('Tickets reserved successfully:',reservedTickets);
            this.router.navigate(['/successPayment'],{ state:{amount: this.chargeRequest.amount}});
          },
          error:err=>{
            console.error('Eroor reserving tickets:',err);
          }
        });
      },
      error:err=>{
        console.error('Payment error',err);
      }
    })
  }

  

  }

 