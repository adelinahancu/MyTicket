import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private baseUrl='http://localhost:8080';

  constructor(private http:HttpClient) { }

  charge(chargeRequest:any):Observable<any>{
    const token=localStorage.getItem('access_token');
    console.log('JWT Token:',token);
    const headers=new HttpHeaders(
      {
        'Authorization':`Bearer ${token}`
      }
    );
    return this.http.post(`${this.baseUrl}/charge`,chargeRequest,{headers});
  }

  
}
