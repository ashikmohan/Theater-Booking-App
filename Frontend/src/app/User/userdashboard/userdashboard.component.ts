import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserveService } from 'src/app/authserve.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent {
  username: string = ''; 
  constructor(private authServe:AuthserveService, private router:Router){}
  isLoggedIn(): boolean{
    return this.authServe.isLoggedIn();
  }

  logout(): void{
    this.authServe.logout();
    this.router.navigate(['/login']);
  }


}

