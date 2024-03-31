import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../model/authRequest.model';
import { Observable, tap } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl="http://localhost:8080/api/v1/auth"

  constructor(private http:HttpClient) { }

  login(authRequest:AuthenticationRequest):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/authenticate`,authRequest);
    
  }

  register(user:User):Observable<any>{
    return this.http.post(`${this.baseUrl}/register`,user);

  }

  isLoggedIn():boolean{
    const token=localStorage.getItem('ACCESS_TOKEN');
    return token!==null;
  }

  getUserInfo():Observable<User>{
    const token=localStorage.getItem('ACCESS_TOKEN');
    const headers=new HttpHeaders().set('Authorization','Bearer ' +token);
    return this.http.get<User>(`${this.baseUrl}/getUser`, {headers});
  }

  updateUserInfo(user:User):Observable<any>{
    const token=localStorage.getItem('ACCESS_TOKEN');
    const headers=new HttpHeaders().set('Authorization','Bearer ' +token);
    return this.http.put<User>(`${this.baseUrl}/updateUser`,user, {headers});
  }

  verifyToken():Observable<any>{
    const token=localStorage.getItem('ACCESS_TOKEN');
    return this.http.post<any>(`${this.baseUrl}/verifytoken`,token);
  }
  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post<any>(`${this.baseUrl}/refresh-token`, { refreshToken })
      .pipe(
        tap(response => {
          localStorage.setItem('access_token', response.accessToken);
        })
      );
  }

  logout():Observable<any>{
    const token=localStorage.getItem('ACCESS_TOKEN');
    const headers=new HttpHeaders().set('Authoziation','Bearer ' +token);
    return this.http.post<any>(`${this.baseUrl}/logout`,null,{headers});
  }


}
