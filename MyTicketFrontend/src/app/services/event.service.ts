import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eveniment } from '../model/eveniment.model';
import { Seat } from '../model/seat.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  

  private baseUrl='http://localhost:8080/api/v1/events'

  constructor(private http:HttpClient) { }

  getAllEvents():Observable<Eveniment[]>{
    return this.http.get<Eveniment[]>(`${this.baseUrl}/allEvents`);
  }

  getEventById(eventId: number):Observable<Eveniment> {
    return this.http.get<Eveniment>(`${this.baseUrl}/getEvent/${eventId}`);
  }
  
  getEventSeats(eventId:number):Observable<Seat[]>{
    return this.http.get<Seat[]>(`${this.baseUrl}/getEventSeat/${eventId}`);
  }

  addEvent(event:Eveniment):Observable<Eveniment>{
    const token=localStorage.getItem('access_token');
    const headers=new HttpHeaders({'Authorization':`Bearer ${token}`,'Content-Type': 'application/json'});
    return this.http.post<Eveniment>(`${this.baseUrl}/addEvent`, event, { headers });
  }
}
