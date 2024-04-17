import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { CommonModule } from '@angular/common';
import { Seat } from '../../model/seat.model';
import { EventService } from '../../services/event.service';
import { Eveniment } from '../../model/eveniment.model';

@Component({
  selector: 'app-location-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location-layout.component.html',
  styleUrl: './location-layout.component.css'
})
export class LocationLayoutComponent implements OnInit {
 
  eventId: number;
  locationId: number;
  seats:Seat[]=[];
  event:Eveniment;

  constructor(private route:ActivatedRoute,private eventService:EventService){

 }
 
  ngOnInit(): void {
   this.route.paramMap.subscribe(params=>{
    this.eventId= +params.get('eventId')!;
    this.locationId=+params.get('locationId')!;
    this.getSeats();

   })
  }

  getSeats():void{
    this.eventService.getEventSeats(this.eventId).subscribe(seats=>{
      this.seats=seats;
    },
    error=>{
      console.error('Error fetching seats:', error);
    });
  }

}
