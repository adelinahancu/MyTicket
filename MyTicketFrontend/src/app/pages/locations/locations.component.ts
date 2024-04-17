import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { Locatie } from '../../model/location.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css'
})
export class LocationsComponent implements OnInit {

locations:Locatie[]=[];

  constructor(private locationService:LocationService,private eventService:EventService){

  }
  ngOnInit(): void {
    this.fetchAllLocations();
  }

  fetchAllLocations():void{
    this.locationService.getAllLocations().subscribe(
      (response: Locatie[])=>{
        this.locations=response;
        console.log("Locactions:",this.locations);

      },
      error=>{
        console.error('Error fetching locations:',error);
      }
    )
  }

 

}
