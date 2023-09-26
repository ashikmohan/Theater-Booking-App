import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/booking.service';
import { MoviefetchingService } from 'src/app/moviefetching.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticketbokking',
  templateUrl: './ticketbokking.component.html',
  styleUrls: ['./ticketbokking.component.css']
})
export class TicketbokkingComponent implements OnInit {
  //  seatRows: string[] = ['A', 'B', 'C']; // Example seat rows
  //  seatNumber: number = 1; // Example seat number
  // movie: { _id: string } = { _id: '' }; // Example movie object
  // selectedSeats: string[] = [];
  // numberOfRows: number = 10; // Change this to the number of rows you need
  // seatsPerRow: number = 10; // Change this to the number of seats per row you need

 
  movie: any = {};
  movieId: string = '';
  // username: string = '';
  seat_number: string ='';
  errorMessage: string = '';
  selectedSeats: string[] = [];
  seatNumbersInput: string = '';

  bookedSeats: string[] = [];

  constructor(private router:Router,private book:BookingService,private route: ActivatedRoute,private fetching:MoviefetchingService){}

ngOnInit(): void {
  this.route.params.subscribe((params) => {
    this.movieId = params['id'];

    

    this.fetching.getMovieById(this.movieId).subscribe((response)=>{
      console.log(this.movie);
      this.movie=response.data
    })
    this.loadSoldSeats();
  });
}
bookTicket() {

  console.log('Selected Seats to Book:', this.selectedSeats);
  // Create an object with the data to be sent to the backend
  const bookingData = {
    movieId: this.movieId,
    // username: this.username,
    seat_number: this.selectedSeats,
    // Add other relevant data fields here
  };

  // Send a POST request to book the ticket using the ApiService
  this.book.bookTicket(bookingData).subscribe(
    (response) => {
      // Handle success response here (e.g., show a success message)
      console.log('Ticket booked successfully',response);
      this.errorMessage = '';
      this.selectedSeats = [];
      this.seatNumbersInput = '';
      Swal.fire('Success!', 'Ticket Booking Successfully', 'success');
      this.router.navigate(['/UserDashboard/usermoviefetched'])

    },
    (error: HttpErrorResponse) => {
      // Handle error response here
      if (error.status === 400) {
        console.error('Seat is not available');
        Swal.fire('Error!', 'Seat is Not Available', 'error');
        this.errorMessage = 'Seat is not available'; // Log the error message
        // Display an error message to the user (you can implement this part)
        // Example: this.errorMessage = 'Seat is not available';
      } else {
        console.error('Error booking ticket:', error);
        Swal.fire('Error!', 'Error booking ticket', 'error');
        // Handle other error cases here
      }
    }
  );
}



toggleSeat(seat: string): void {

   if (this.isSeatDisabled(seat)) {
    // Handle the case when the seat is booked or already selected
    alert('This seat is already booked.');
    return;
  }




  const seatIndex = this.selectedSeats.indexOf(seat);
  if (seatIndex !== -1) {
    this.selectedSeats.splice(seatIndex, 1); // Deselect the seat
  } else {
    this.selectedSeats.push(seat); // Select the seat
  }
  this.seat_number = seat; 
  this.seatNumbersInput = this.selectedSeats.join(', ');
  console.log('Selected Seats:', this.selectedSeats); 
}


isSeatSelected(seat: string):boolean {
  return this.selectedSeats.includes(seat);
}

isSeatBooked(seat: string): boolean {
  return this.bookedSeats.includes(seat);
}

isSeatDisabled(seat: string): boolean {
  return this.isSeatBooked(seat) || this.isSeatSelected(seat);
}


loadSoldSeats() {
  this.book.getSoldSeats(this.movieId).subscribe(
    (response) => {
      this.bookedSeats = response;
    },
    (error) => {
      console.error('Error loading sold seats:', error);
    }
  );
}



}