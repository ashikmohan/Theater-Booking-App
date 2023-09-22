import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private ratings: { [movieId: string]: number[] } = {};
  constructor() { }

  
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
