import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Observable, map } from 'rxjs';
=======
import { Observable } from 'rxjs';
>>>>>>> d0a9e15cb6077b9b112d0e76d27ccc7f85d7284a


@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private baseUrl='http://localhost:8080';
<<<<<<< HEAD
  private stripeApiUrl='https://api.stripe.com/v1';
 
=======

>>>>>>> d0a9e15cb6077b9b112d0e76d27ccc7f85d7284a
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

<<<<<<< HEAD
  getRevenueForCurrentMonth():Observable<number>{
    const currentDate=new Date();
    const currentMonth=new Date(currentDate.getFullYear(),currentDate.getMonth(),1).getTime()/1000;
    const apiKey='sk_test_51P92cMP1emHE3cOZbxut2nKVMayfMGCGFEnf1AmyakyQyKse6CaWYK4d6Y65iMMj9Ffi95VBOxhQ71GelheMR2mL00z8qRbPw7';
    const headers={'Authorization':`Bearer ${apiKey}`};
    return this.http.get<any>(`${this.stripeApiUrl}/balance?created[gte]=${currentMonth}`,{headers}).pipe(
      map(balance=>balance.pending[0].amount/100));
    }
    

    getRevenue():Observable<number>{
      const apiKey='sk_test_51P92cMP1emHE3cOZbxut2nKVMayfMGCGFEnf1AmyakyQyKse6CaWYK4d6Y65iMMj9Ffi95VBOxhQ71GelheMR2mL00z8qRbPw7';
      const headers={'Authorization':`Bearer ${apiKey}`};
      return this.http.get<any>(`${this.stripeApiUrl}/balance`,{headers})
    }

 
=======
>>>>>>> d0a9e15cb6077b9b112d0e76d27ccc7f85d7284a
  
}
