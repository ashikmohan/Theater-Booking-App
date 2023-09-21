import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserveService } from 'src/app/authserve.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  constructor(private authserve:AuthserveService,private router:Router ){}

  isLoggedIn(): boolean{
    return this.authserve.isLoggedIn();
  }

  logout(): void{
    this.authserve.logout();
    this.router.navigate(['/login']);
  }

}
