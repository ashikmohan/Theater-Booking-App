import { Component, OnInit } from '@angular/core';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AddmovieService } from 'src/app/addmovie.service';
import { MoviefetchingService } from 'src/app/moviefetching.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {
 
  
  movie: any = {};
  // safeImageUrl: SafeUrl | undefined;
  imageSrc: string | ArrayBuffer | null = null;

constructor(private route:ActivatedRoute, private addmovie:AddmovieService,private fetching:MoviefetchingService,private sanitizer:DomSanitizer){}
ngOnInit(): void {
  this.route.params.subscribe((params) => {
      const movieId = params['id'];
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
     })
  });
}

  }