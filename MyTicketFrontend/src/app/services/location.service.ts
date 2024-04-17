import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Locatie } from '../model/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private baseUrl="http://localhost:8080/api/v1/location";

  constructor(private http:HttpClient) { }

  getAllLocations():Observable<Locatie[]>{
    return this.http.get<Locatie[]>(`${this.baseUrl}/getAllLocations`);
  }

  addLocation( location:Locatie):Observable<any>{
    return this.http.post(`${this.baseUrl}/addLocation`,location);
  }
  
}
