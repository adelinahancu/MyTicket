import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { Eveniment } from '../../model/eveniment.model';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule,MatCardModule,RouterModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  events:Eveniment[]=[];

  constructor(private eventService:EventService){}
  
  ngOnInit(): void {
    console.log("started fetching all events");
    this.getAllEvents();
  }
  getAllEvents():void {
   this.eventService.getAllEvents().subscribe(
    (events:Eveniment[])=>{
      this.events=events;
      console.log("events:",events);
    
  },
  (error) => {
    console.error("Error fetching events:", error);
  }
   );
}

}
