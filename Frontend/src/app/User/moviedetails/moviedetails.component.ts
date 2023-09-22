import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AddmovieService } from 'src/app/addmovie.service';
import { MoviefetchingService } from 'src/app/moviefetching.service';
import { RatingService } from 'src/app/rating.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {
 

  
  
  movie: any = {};
  // safeImageUrl: SafeUrl | undefined;
  imageSrc: string | ArrayBuffer | null = null;
  userRating: number | undefined;
  // averageRatings: number[] = [];
  averageRating: number =0;

  
  userReview: string = ''; // Declare and initialize userReview property
  reviews: any[] = []; // Declare and initialize reviews property
  

constructor(private route:ActivatedRoute, private addmovie:AddmovieService,private fetching:MoviefetchingService,private sanitizer:DomSanitizer,private rating:RatingService){}
ngOnInit(): void {
  

  this.route.params.subscribe((params) => {
      const movieId = params['id'];

      // this.fetchMovieDetails(movieId);
      // this.fetchMovieReviews(movieId);

      console.log('Movie ID:', movieId);
      // Fetch movie details using movieId and your fetching service
     this.fetching.getMovieById(movieId).subscribe((response)=>{
      console.log(this.movie);
      this.movie=response.data
      console.log('Movie Data:', this.movie);
      // convert the binary image data to safeurl

      // if(this.movie && this.movie.image && this.movie.image.data){
      //   const binaryData = this.movie.image.data;
      //     const base64String = btoa(
      //       new Uint8Array(binaryData).reduce(
      //         (data, byte) => data + String.fromCharCode(byte),
      //         ''
      //       )
      //     );
      //     const imageUrl = `data:image/jpeg;base64,${base64String}`;
      //     this.safeImageUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
          
      // }


      
      if (this.movie && this.movie.image && this.movie.image.data) {
        const blob = new Blob([new Uint8Array(this.movie.image.data.data)]);
        const reader = new FileReader();

        reader.onload = (e) => {
          this.imageSrc = e.target?.result || null;
        };

        reader.readAsDataURL(blob);
      }
     // Fetch the average rating for the movie
     this.averageRating = this.rating.getAverageRating(movieId);
     
     this.addmovie.getReviewsByMovieId(this.movie._id).subscribe((data: any[]) => {
      this.reviews = data;
    });
    });
     
  });


}


rateMovie() {
  if (this.userRating && this.movie._id) {
    

    this.rating.rateMovie(this.movie._id, this.userRating);
    // Update the average rating after rating
    this.averageRating = this.rating.getAverageRating(this.movie._id);
    this.userRating = undefined; // Clear the user rating input
  }
}

addReview() {
  if (this.userReview && this.movie._id) {
    this.addmovie.addReview(this.movie._id, this.userReview).subscribe(() => {
      // After adding the review, update the displayed reviews
      
      this.addmovie.getReviewsByMovieId(this.movie._id).subscribe((data: any[]) => {
        this.reviews = data;
      });

      // Clear the user's review input
      this.userReview = '';
    });
  }
}

// rateMovie() {
//   if (this.userRating && this.movie._id) {
//     const userId = 'exampleUserId'; // Replace with the actual user ID if available
//     this.rating.rateMovie(this.movie._id,  this.userRating).subscribe(() => {
//       // Update the average rating after rating
//       this.fetchAverageRating();
//       this.userRating = undefined; // Clear the user rating input
//     });
//   }
// }

// fetchAverageRating() {
//   if (this.movie && this.movie._id) {
//     this.rating.getAverageRating(this.movie._id).subscribe((response) => {
//       this.averageRating = response.averageRating;
//     });
//   }
// }
 

}





