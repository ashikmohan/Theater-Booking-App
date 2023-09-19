import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviefetchingService {
  private apiUrl='http://localhost:3000/ticket-booking';


  constructor(private http:HttpClient) { }
  
  getMovieById(id:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/moviedetails/${id}`);
}

 
}
