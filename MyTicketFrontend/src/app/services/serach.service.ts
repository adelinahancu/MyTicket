import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eveniment } from '../model/eveniment.model';

@Injectable({
  providedIn: 'root'
})
export class SerachService {
  private searchUrl = 'http://localhost:8080/api/v1/events/search'; 

  constructor(private http: HttpClient) { }

  searchEvents(query:string):Observable<Eveniment[]>{
   
    return this.http.get<Eveniment[]>(`${this.searchUrl}?query=${query}`);
    
  }
}
