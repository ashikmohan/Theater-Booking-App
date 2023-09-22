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

  
  addReview(movieId: string, reviewText: string): Observable<any> {
    const body = { movieId, reviewText };
    return this.http.post(`${this.apiUrl}/addreview`, body);
  }

  getReviewsByMovieId(movieId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reviews/${movieId}`);
  }
  
}
