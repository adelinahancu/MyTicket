import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../model/authRequest.model';
import { Observable, tap } from 'rxjs';
import { User } from '../model/user.model';
import { UserDto } from '../model/userDto.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
isAdmin:boolean=false;
  private baseUrl="http://localhost:8080/api/v1/auth"

  constructor(private http:HttpClient) { }

  login(authRequest:AuthenticationRequest):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/authenticate`,authRequest);
    
  }

  register(user:User):Observable<any>{
    return this.http.post(`${this.baseUrl}/register`,user);

  }

  isLoggedIn():boolean{
    const token=localStorage.getItem('access_token');
    return token!==null;
  }

  getUserInfo():Observable<UserDto>{
    const token=localStorage.getItem('access_token');
    console.log('Access Token:', token);
    const headers=new HttpHeaders({'Authorization': `Bearer ${token}`});
    console.log('Request Headers:', headers);
    return this.http.get<UserDto>(`${this.baseUrl}/getUser`, {headers});
  }

  updateUserInfo(userDto:UserDto):Observable<any>{
    const token=localStorage.getItem('access_token');
    const headers=new HttpHeaders({'Authorization': `Bearer ${token}`});
    console.log('Request Headers:', headers);
    return this.http.put<UserDto>(`${this.baseUrl}/updateUser`,userDto, {headers});
  }

  verifyToken():Observable<any>{
    const token=localStorage.getItem('access_token');
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
    const token=localStorage.getItem('access_token');
    const headers=new HttpHeaders().set('Authorization','Bearer ' +token);
    return this.http.post<any>(`${this.baseUrl}/logout`,null,{headers});
  }

  getIsAdmin(): boolean {
    return this.isAdmin;
  }
 


}
