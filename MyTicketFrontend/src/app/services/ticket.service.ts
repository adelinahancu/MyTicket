import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Seat } from '../model/seat.model';
import { Eveniment } from '../model/eveniment.model';
import { Ticket } from '../model/ticket.model';
import { TicketRequest } from '../model/ticketRequest.model';
import { MultipleTicketsRequest } from '../model/multipleTicketsRequest.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  baseUrl="http://localhost:8080/api/v1/ticket"

  constructor(private http:HttpClient) { }

  
  reserveTickets(multipleTickets:MultipleTicketsRequest):Observable<Ticket[]>{
    const token=localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<Ticket[]>(`${this.baseUrl}/reserve`,multipleTickets,{headers})
    .pipe(
      catchError(error=>{
      console.error('Eroor occured while reserving ticket:',error);
      throw error;
    })
    );
  }


  getTicketsForEvent(eventId:number):Observable<Ticket[]>{
    return this.http.get<Ticket[]>(`${this.baseUrl}/allTickets/${eventId}`);
  }

  isSeatAvailableForEvent(event: Eveniment, seat: Seat): Observable<boolean> {
    const url = `${this.baseUrl}/checkSeatAvailability`;
    const body = { event, seat };

    return this.http.post<boolean>(url, body)
      .pipe(
        catchError(error => {
          console.error('Error checking seat availability:', error);
          throw error;
        })
      );
  }
  

}
