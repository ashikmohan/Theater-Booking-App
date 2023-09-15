import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddmovieService } from 'src/app/addmovie.service';

@Component({
  selector: 'app-addmovies',
  templateUrl: './addmovies.component.html',
  styleUrls: ['./addmovies.component.css']
})
export class AddmoviesComponent {
  
constructor(private addmovie:AddmovieService){}



}

