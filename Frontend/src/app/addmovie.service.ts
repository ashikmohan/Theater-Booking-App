import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddmovieService {
  private apiUrl='http://localhost:3000/ticket-booking';
  
  
  constructor(private http:HttpClient) { }

  
  
}
