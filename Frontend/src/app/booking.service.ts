import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl='http://localhost:3000/ticket-booking';


  constructor(private http:HttpClient) { }
  
  bookTicket(data: any) {
    return this.http.post(`${this.apiUrl}/bookticket`, data);
  }

  // Add a method to get details of booked tickets
  getBookedTickets() {
    return this.http.get(`${this.apiUrl}/booking`);
  }

  // Add a method to get booking details by ID
  getBookingDetailsById(bookingId: string) {
    return this.http.get(`${this.apiUrl}/booking/${bookingId}`);
  }


  // Add a method to get the list of sold seats for a specific movie
getSoldSeats(movieId: string): Observable<string[]> {
  return this.http.get<string[]>(`${this.apiUrl}/soldseats/${movieId}`);
}
}
