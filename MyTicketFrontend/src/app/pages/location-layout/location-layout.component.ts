import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Seat } from '../../model/seat.model';
import { EventService } from '../../services/event.service';
import { Eveniment } from '../../model/eveniment.model';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../model/ticket.model';
import { TicketRequest } from '../../model/ticketRequest.model';
import { Observable, catchError, map } from 'rxjs';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-location-layout',
  standalone: true,
  imports: [CommonModule,MatTabsModule,DatePipe],
  templateUrl: './location-layout.component.html',
  styleUrl: './location-layout.component.css'
})
export class LocationLayoutComponent implements OnInit {
 
  eventId: number;
  event:Eveniment;
  selectedSeat:Seat[]=[];
 // isSeatAvailable:boolean;
  
  locationId: number;
  seats:Seat[]=[];

  token:string|null=null;
  ticket:Ticket|null=null;
  tickets:Ticket[]=[];
  ticketRequest:TicketRequest;
  seatAvailability: { [key: number]: boolean } = {};
  totalAmountToPay:number=0;

  constructor(private route:ActivatedRoute,private eventService:EventService,private ticketService:TicketService,private router:Router){

 }


 
  ngOnInit(): void {
   this.route.paramMap.subscribe(params=>{
    this.eventId= +params.get('eventId')!;
    this.locationId=+params.get('locationId')!;
    this.token=localStorage.getItem("access_token");
    this.getEventDetails();
   
    
    //this.ticketRequest=new TicketRequest();
    
    

   })
  }

 
getEventDetails():void{
  this.eventService.getEventById(this.eventId).subscribe(
    (event:Eveniment)=>{
      this.event=event;
      this.getSeats();
      this.getTickets();
    },
    error=>{
      console.error("Error fetching event:",error);
    }
  )
}
  getSeats():void{
    this.eventService.getEventSeats(this.eventId).subscribe(seats=>{
      this.seats=seats;
      this.initializeSeatAvailability();
      
      
    },
    error=>{
      console.error('Error fetching seats:', error);
    });
  }

  getTickets():void{
    this.ticketService.getTicketsForEvent(this.eventId).subscribe(tickets=>{
      this.tickets=tickets;
      console.log("tickets",tickets);
    })
  }
  
  initializeSeatAvailability(): void {
    this.seats.forEach(seat => {
      this.isSeatBooked(seat.id).subscribe(isBooked => {
        this.seatAvailability[seat.id] = isBooked;
        console.log(`Seat ${seat.id} availability: ${isBooked ? 'Booked' : 'Available'}`);
      });
    });
  }
  isSeatBooked(seatId: number): Observable<boolean> {
    
    const seat = this.seats.find(s => s.id === seatId);
  
    
    if (!seat) {
      return new Observable<boolean>(observer => {
        observer.next(false); // Seat not found, return false
        observer.complete();
      });
    }
  
  
    return this.ticketService.isSeatAvailableForEvent(this.event!, seat).pipe(
      
      map(isAvailable => !isAvailable),
      catchError(error => {
        console.error('Error checking seat availability:', error);
        throw error;
      })
    );
  }
  
 

  onSeatSelected(seat: Seat): void {
    // Check if seat is already selected
    const index = this.selectedSeat.findIndex(s => s.id === seat.id);

    if (index === -1) {
      // Seat is not selected, add it to the selectedSeats array
      this.selectedSeat.push(seat);
    } else {
      // Seat is already selected, remove it from the selectedSeats array
      this.selectedSeat.splice(index, 1);
     
    }
    this.calculateTotalAmountToPay();
  }

  isSeatSelected(seat: Seat): boolean {
    // Check if the seat is selected
    return this.selectedSeat.some(s => s.id === seat.id);
  }

  calculateTotalAmountToPay():void{
    const ticketPrice=this.event?.ticketPrice || 0;
    this.totalAmountToPay=this.selectedSeat.length*ticketPrice;
  }

  removeSeat(seat: Seat): void {
    this.selectedSeat = this.selectedSeat.filter(s => s !== seat);
    this.updateTotalAmountToPay();
  }
  updateTotalAmountToPay() {
    this.totalAmountToPay = this.selectedSeat.reduce((sum, seat) => sum + this.event!.ticketPrice, 0);
  }

  navigateToPayment(totalAmountToPay: number, event: Eveniment, selectedSeat: Seat[]) {
    if (event && selectedSeat && selectedSeat.length > 0) {
      this.router.navigate(['/payment'], {
        state: {
          totalAmountToPay: totalAmountToPay,
          event: event,
          selectedSeat: selectedSeat
        }
      });
    } else {
      console.error('Event or selected seats are null or empty.');
     
    }
  }

}
