import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddmovieService } from 'src/app/addmovie.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  list:any[]=[]
  constructor(private router:Router,private addmovie:AddmovieService){}
  ngOnInit(){
    this.addmovie.getMovies().subscribe((res:any[])=>{
      console.log('Movies fetched:', res);
      this.list = res.map(movie => {
        const imageBase64 = this.arrayBufferToBase64(movie.image.data.data);
        // console.log('Image Base64:', imageBase64);
        return {
          ...movie,
          image: `data:${movie.image.contentType};base64,${imageBase64}`
        };
      });
      
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
