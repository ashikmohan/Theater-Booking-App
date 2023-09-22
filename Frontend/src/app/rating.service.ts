import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
   private ratings: { [movieId: string]: number[] } = {};

  // private apiUrl='http://localhost:3000/ticket-booking';


  constructor(private http:HttpClient) { }

  // rateMovie(movieId: string, rating: number): Observable<any> {
  //   const body = {  movieId, rating };
  //   return this.http.post(`${this.apiUrl}/addrating`, body);
  // }

  // getAverageRating(movieId: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/averagerating/${movieId}`);
  // }
  
  rateMovie(movieId: string, rating: number) {
    if (!this.ratings[movieId]) {
      this.ratings[movieId] = [];
    }

    this.ratings[movieId].push(rating);
  }

  getAverageRating(movieId: string): number {
    const ratings = this.ratings[movieId];
    if (!ratings || ratings.length === 0) {
      return 0;
    }

    const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
    return totalRating / ratings.length;
  }

  
}
