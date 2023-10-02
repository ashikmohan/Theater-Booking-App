import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddmovieService } from 'src/app/addmovie.service';
import { MoviefetchingService } from 'src/app/moviefetching.service';
import { RatingService } from 'src/app/rating.service';

@Component({
  selector: 'app-usermoviefetched',
  templateUrl: './usermoviefetched.component.html',
  styleUrls: ['./usermoviefetched.component.css']
})
export class UsermoviefetchedComponent {
  list:any[]=[];
  // movies: any[] = [];
  userId: string | null = null;
  searchMovie:string=''
  constructor(private router:Router,private addmovie:AddmovieService,private route: ActivatedRoute,private fetching:MoviefetchingService,private rating:RatingService){}
  ngOnInit(){
    
    this.addmovie.getMovies().subscribe((res:any[])=>{
      console.log('Movies fetched:', res);
      this.list = res.map(movie => {
        const imageBase64 = this.arrayBufferToBase64(movie.image.data.data);
        movie.averageRating = this.rating.getAverageRating(movie._id); // Calculate average rating and assign it directly
        // console.log('Image Base64:', imageBase64);
        return {
          ...movie,
          image: `data:${movie.image.contentType};base64,${imageBase64}`,
        
        };
        
      }
      );
      
      
      
      // console.log('List of movies:', this.list);
      // console.log('Image Data URL:', this.list[0].image);

    },
    (error)=>{
      console.error(`Error fetched requirements:`,error)

    }
    )
   
    
    
  }

  arrayBufferToBase64(buffer: ArrayBuffer) {
    const binary = new Uint8Array(buffer);
    let base64 = '';
    binary.forEach(byte => {
      base64 += String.fromCharCode(byte);
    });
    return btoa(base64);
  }
 



}
