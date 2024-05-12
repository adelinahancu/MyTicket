import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserMonthlyStats } from '../model/userMonthlyStats.model';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http:HttpClient) { }

  private baseUrl="http://localhost:8080/api/v1/stats";
  private ticketURL="http://localhost:8080/api/v1/ticket"
  private visitUrl="http://localhost:8080/api/v1/visit"
  private eventUrl="http://localhost:8080/api/v1/events"
 

  getUserStats():Observable<UserMonthlyStats[]>{
    const token=localStorage.getItem('access_token');
    const headers=new HttpHeaders({'Authorization':`Bearer ${token}`,'Content-Type': 'application/json'});
    return this.http.get<UserMonthlyStats[]>(`${this.baseUrl}/monthly-registration`,{headers:headers});
  }

  getCountOfTicketsSoldForCurrentMonth():Observable<number>{
    const token=localStorage.getItem("access_token");
    const headers=new HttpHeaders({'Authorization':`Bearer ${token}`,'Content-Type':'application/json'});
    return this.http.get<number>(`${this.ticketURL}/tickets-sold-current-month`);
  }

  incrementVisitCount():Observable<number>{
    const token=localStorage.getItem('access_token');
    const headers=new HttpHeaders({'Authorization':`Bearer ${token}`,'Content-Type': 'application/json'});
    return this.http.get<number>(`${this.visitUrl}/increment`,{headers:headers});
  }
  getVisitCount(): Observable<number> {
    const token=localStorage.getItem('access_token');
    const headers=new HttpHeaders({'Authorization':`Bearer ${token}`,'Content-Type': 'application/json'});
    return this.http.get<number>(`${this.visitUrl}/count`,{headers});
  }

  getWeeklyTicketSales(): Observable<any> {
    return this.http.get<any>(`${this.ticketURL}/weekly-ticket-sales`);
    };
  

  getTicketSalesByEvent():Observable<any[]>{
    return this.http.get<any>(`${this.ticketURL}/ticket-sales-by-event`);
  }

  getRevenueByEvent(): Observable<any> {
    return this.http.get<any>(`${this.eventUrl}/get-events-revenue`);
  }

}
