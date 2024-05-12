import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionSreviceService {

  constructor(private http:HttpClient) { }
  private apiUrl='https://api.stripe.com/v1/charges';

  getTransactions():Observable<any>{
    const headers=new HttpHeaders({
      'Authorization':'Bearer sk_test_51P92cMP1emHE3cOZbxut2nKVMayfMGCGFEnf1AmyakyQyKse6CaWYK4d6Y65iMMj9Ffi95VBOxhQ71GelheMR2mL00z8qRbPw7'
    });

    return this.http.get(this.apiUrl,{headers}).pipe
    (map((response:any)=>response.data));
  }
}
