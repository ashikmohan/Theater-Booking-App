import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AddmovieService } from 'src/app/addmovie.service';

@Component({
  selector: 'app-addmovies',
  templateUrl: './addmovies.component.html',
  styleUrls: ['./addmovies.component.css']
})
export class AddmoviesComponent {
  selectedFile: File | null = null;
constructor(private addmovie:AddmovieService,private router:Router){}

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0] as File;
}

onSubmit(form: NgForm) {
  if (form.valid && this.selectedFile) {
    const formData = new FormData();
    formData.append('moviename', form.value.moviename);
    formData.append('category', form.value.category);
    formData.append('languages', form.value.languages);
    formData.append('cast', form.value.cast);
    formData.append('description', form.value.description);
    formData.append('time', form.value.time);
    formData.append('screen', form.value.screen);
    formData.append('rates', form.value.rates);
    formData.append('seats', form.value.seats);
    formData.append('image', this.selectedFile);

    this.addmovie.addMovie(formData).subscribe(
      (response) => {
        console.log('Movie added successfully:', response);
        this.router.navigate(['/AdminDashboard/moviefetched'])
        // Reset the form
        form.reset();
      },
      (error) => {
        console.error('Error adding movie:', error);
      }
    );
  }
}

}

