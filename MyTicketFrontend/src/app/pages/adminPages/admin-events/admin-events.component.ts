import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Eveniment } from '../../../model/eveniment.model';
import { EventService } from '../../../services/event.service';
import { LocationService } from '../../../services/location.service';
import { Locatie } from '../../../model/location.model';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-admin-events',
    standalone: true,
    templateUrl: './admin-events.component.html',
    styleUrl: './admin-events.component.css',
    imports: [DashboardComponent,MatCardModule,CommonModule,FormsModule,ReactiveFormsModule,MatSnackBarModule]
})
export class AdminEventsComponent implements OnInit {

    addEventForm:FormGroup;
    events:Eveniment[]=[];
    event:Eveniment=new Eveniment();
    locations:Locatie[]=[];

    constructor(private formBuilder:FormBuilder,private eventService:EventService,private locationService:LocationService,private snackBar:MatSnackBar){}

    ngOnInit(): void {
        this.addEventForm=this.formBuilder.group({
            eventName:['',Validators.required],
            description:['',Validators.required],
            locationId:['',Validators.required],
            category:['',Validators.required],
            eventDate:['',Validators.required],
            imageUrl:['',Validators.required],
            startTime:['',Validators.required],
            endTime:['',Validators.required],
            ticketPrice:['',Validators.required]


        })

        this.locationService.getAllLocations().subscribe((data: Locatie[]) => {
            this.locations = data;
          });

        this.getAllEvents();
    }

    addEvent(){
        this.eventService.addEvent(this.event).subscribe((eveniment:Eveniment)=>{
            this.event=eveniment;
            this.snackBar.open('Eveniment adaugat cu succes!', 'Close', {
                duration: 3000,
                panelClass: ['snackbar-success']
              });
              this.addEventForm.reset();
        }),(error: any)=>{
            console.error("Error adding event:",error);
            this.snackBar.open('Eroare la adaugarea evenimentului.Incearca din nou.', 'Close', {
                duration: 3000,
                panelClass: ['snackbar-error']
              });
              this.addEventForm.reset();
        }
    }

    getAllEvents(){
        this.eventService.getAllEvents().subscribe((events:Eveniment[])=>{
            this.events=events;
        },
        error=>{
            console.error('Error fetching all events',error);
        })
    }

    onLocationChange(event: any) {
        const selectedLocationId = event.target.value;
        const selectedLocation = this.locations.find(loc => loc.id === +selectedLocationId);
        if (selectedLocation) {
          this.event.location = selectedLocation;
        }
      }

    onSubmit(){
        this.addEvent();
      }
    
}
