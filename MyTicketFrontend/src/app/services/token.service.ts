import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  baseUrl:string='http://localhost:8080';

  constructor(private http:HttpClient) { }

  refreshToken():Observable<any>{
    const token=localStorage.getItem('ACCESS_TOKEN');
    const headers=new HttpHeaders().set('Authorization','Bearer '+token);
    const refreshToken=localStorage.getItem('REFRESH_TOKEN');
    const requestBody={refreshToken};
    console.log(requestBody);
    return this.http.post(`${this.baseUrl}/refreshToken`,requestBody,{headers,responseType:'text'})
    .pipe(
      tap((newAccessToken:string)=>{localStorage.setItem('ACCESS_TOKEN',newAccessToken);})
    );
  } 
}
