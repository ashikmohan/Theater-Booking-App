import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserveService } from 'src/app/authserve.service';
import { BookingService } from 'src/app/booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mytickets',
  templateUrl: './mytickets.component.html',
  styleUrls: ['./mytickets.component.css']
})
export class MyticketsComponent implements OnInit{
  
  usertickets:any[] = []
  username: string | null = null; 
  isLoading: boolean = true;
  constructor(private route:ActivatedRoute,private booking:BookingService,private authserve:AuthserveService,private router:Router){}
 

ngOnInit(): void {

  this.username = this.authserve.getUsername();

  //  if (this.username) {
  //   this.booking.getUserTickets(this.username).subscribe(
  //     (res: any) => {
  //       this.usertickets = res.data;
  //       console.log('fetching user tickets')
  //       this.isLoading = false;
  //     },
  //     (error: any) => {
  //       console.error('Error fetching user tickets:', error);
  //       this.isLoading = false;
  //     }
  //   );
  //   }

  if (this.username) {
    // Check if the data is already cached
    if (!this.usertickets.length) {
      this.fetchUserTickets();
    } else {
      this.isLoading = false;
    }
  }
    
  }


  fetchUserTickets() {
    this.booking.getUserTickets(this.username).subscribe(
      (res: any) => {
        this.usertickets = res.data;
        console.log('fetching user tickets');
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching user tickets:', error);
        this.isLoading = false;
      }
    );
  }





deleteTickets(ticketId: string) {
  this.booking.deletetickets(ticketId).subscribe(
    (res: any) => {
      console.log('Ticket deleted successfully');
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        // showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, cancel it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Cancelled!', 'Your ticket has been Cancelled.', 'success');
        }
      });

      // Remove the deleted ticket from the cached data
      this.usertickets = this.usertickets.filter(
        (ticket) => ticket._id !== ticketId
      );
    },
    (error: any) => {
      console.error('Error deleting ticket:', error);
    }
  );
}



}


