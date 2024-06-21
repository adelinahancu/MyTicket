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
  private adminUrl="http://localhost:8080/api/v1/admin"
 

  getUserStats():Observable<UserMonthlyStats[]>{
    const token=localStorage.getItem('access_token');
    const headers=new HttpHeaders({'Authorization':`Bearer ${token}`,'Content-Type': 'application/json'});
    return this.http.get<UserMonthlyStats[]>(`${this.baseUrl}/monthly-registration`,{headers:headers});
  }

  getCountOfTicketsSoldForCurrentMonth():Observable<number>{
    const token=localStorage.getItem("access_token");
    const headers=new HttpHeaders({'Authorization':`Bearer ${token}`,'Content-Type':'application/json'});
    return this.http.get<number>(`${this.adminUrl}/tickets-sold-current-month`,{headers});
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
    const token=localStorage.getItem('access_token');
    const headers=new HttpHeaders({'Authorization':`Bearer ${token}`,'Content-Type': 'application/json'});
    return this.http.get<any>(`${this.adminUrl}/weekly-ticket-sales`,{headers});
    };
  

  getTicketSalesByEvent():Observable<any[]>{
    const token=localStorage.getItem('access_token');
    const headers=new HttpHeaders({'Authorization':`Bearer ${token}`,'Content-Type': 'application/json'});
    return this.http.get<any>(`${this.adminUrl}/ticket-sales-by-event`,{headers});
  }

  getRevenueByEvent(): Observable<any> {
    const token=localStorage.getItem('access_token');
    const headers=new HttpHeaders({'Authorization':`Bearer ${token}`,'Content-Type': 'application/json'});
    return this.http.get<any>(`${this.adminUrl}/get-events-revenue`,{headers });
  }

}
