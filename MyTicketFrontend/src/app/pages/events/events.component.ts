import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { Eveniment } from '../../model/eveniment.model';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { FavoriteEventsService } from '../../services/favorite-events.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule,MatCardModule,RouterModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  events:Eveniment[]=[];
  isHearIconFilled:boolean[]=[];
  favoriteEvents:Eveniment[]=[];
  favoriteEventIds: number[] = [];

  constructor(private eventService:EventService,private router:Router){}
  
  
  
  ngOnInit(): void {
    console.log("started fetching all events");
    this.getAllEvents();
    const favoriteEventIdsFromStorage = localStorage.getItem('favoriteEventIds');
  if (favoriteEventIdsFromStorage) {
    this.favoriteEventIds = JSON.parse(favoriteEventIdsFromStorage);
  }
  const stateData = { favoriteEventIds: this.favoriteEventIds };
  //this.router.navigateByUrl('/myaccount', { state: stateData });
  
 
  }

  getAllEvents():void {
   this.eventService.getAllEvents().subscribe(
    (events:Eveniment[])=>{
      this.events=events;
      this.isHearIconFilled=new Array(events.length).fill(false);
      console.log("events:",events);
    
  },
  (error) => {
    console.error("Error fetching events:", error);
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


