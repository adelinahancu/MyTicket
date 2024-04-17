import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Eveniment } from '../../model/eveniment.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule,DatePipe,RouterModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {

  eventId:number;
  event:Eveniment;
  constructor(private route:ActivatedRoute,private eventService:EventService,private router:Router){}

  ngOnInit():void{
    this.route.params.subscribe(params=>{this.eventId=+params["id"];
    this.loadEventDetails(this.eventId);
  
  });
  }
  loadEventDetails(eventId: number):void {
   this.eventService.getEventById(eventId).subscribe(
    (event:Eveniment)=>{
      this.event=event;

    },
    error=>{
      console.error("Failed to load event",error);
    }
   )
  }

  buyTicket(): void {
    if (this.event && this.event.location && this.event.location.id) {
      const locationId = this.event.location.id;
      const eventId=this.event.id;
      this.router.navigate([`/event/${eventId}/location/${locationId}`]); // Navigate to location layout with locationId
    }
  }

}
