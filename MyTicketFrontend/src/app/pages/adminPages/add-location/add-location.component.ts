import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LocationService } from '../../../services/location.service';
import { Locatie } from '../../../model/location.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-location',
  standalone: true,
  imports: [DashboardComponent,CommonModule,FormsModule,ReactiveFormsModule,MatCardModule],
  templateUrl: './add-location.component.html',
  styleUrl: './add-location.component.css'
})
export class AddLocationComponent implements OnInit {

  newLocation:Locatie=new Locatie();

  locations:Locatie[]=[];

  addLocationForm: FormGroup;

  constructor(private locationService:LocationService,private formBuilder:FormBuilder){}



  ngOnInit(): void {
    this.addLocationForm=this.formBuilder.group({
      locationName:['',Validators.required],
      address:['',Validators.required],
      capacity:['',Validators.required],
      hasSeats:['',Validators.required],
      imageUrl:['',Validators.required]

    })

    this.fetchAllLocations();
  }

  addLocation():void{
   this.locationService.addLocation(this.newLocation).subscribe(
    (response)=>{
      console.log('Location added successfully:',response);
      this.addLocationForm.reset();
    },
    (error)=>{
      console.error('Error adding location:',error);
    }
   );
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


  onSubmit(){
    this.addLocation();
  }


  

}
