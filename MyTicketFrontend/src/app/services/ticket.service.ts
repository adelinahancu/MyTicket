import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Seat } from '../model/seat.model';
import { Eveniment } from '../model/eveniment.model';
import { Ticket } from '../model/ticket.model';
import { TicketRequest } from '../model/ticketRequest.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  baseUrl="http://localhost:8080/api/v1/ticket"

  constructor(private http:HttpClient) { }

  reserveTicket(ticketRequest: TicketRequest): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200' // Specify frontend origin
      })
    };

    return this.http.post<any>(`${this.baseUrl}/reserve`, ticketRequest, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error occurred while reserving ticket:', error);
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
