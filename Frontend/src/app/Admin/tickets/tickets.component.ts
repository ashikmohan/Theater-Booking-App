import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/booking.service';
import { MoviefetchingService } from 'src/app/moviefetching.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit{
  bookedTickets: any[] = [];
  
  constructor(private booking:BookingService,private fetching:MoviefetchingService){ }

  ngOnInit(): void {
    this.booking.getBookedTickets().subscribe(
      (data:any)=>{
        this.bookedTickets=data;

        

        


      },
      (error: any) => {
        console.error('Error fetching booked tickets:', error);
        // Handle the error, e.g., show an error message to the admin.
      }
    );
   

  }
}
