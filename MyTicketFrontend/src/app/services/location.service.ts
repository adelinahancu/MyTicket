import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Locatie } from '../model/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private baseUrl="http://localhost:8080/api/v1/location";
  private adminUrl="http://localhost:8080/api/v1/admin"

  constructor(private http:HttpClient) { }

  getAllLocations():Observable<Locatie[]>{
    return this.http.get<Locatie[]>(`${this.baseUrl}/getAllLocations`);
  }

  addLocation( location:Locatie):Observable<any>{
    const token=localStorage.getItem('access_token');
    const headers=new HttpHeaders({'Authorization':`Bearer ${token}`,'Content-Type': 'application/json'});
    return this.http.post(`${this.adminUrl}/addLocation`,location,{headers});
  }
  
}
