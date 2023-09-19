import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddmovieService {
  private apiUrl='http://localhost:3000/ticket-booking';
  
  
  constructor(private http:HttpClient) { }


  addMovie(formData: FormData) {
    return this.http.post(`${this.apiUrl}/addmovies`, formData);
  }
  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/moviefetched`);

  }

}
