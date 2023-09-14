import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserveService } from '../authserve.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
User={
  username:'',
  password:''
}
constructor(private router:Router,private authserve:AuthserveService){}
login(){
  this.authserve.login(this.User.username,this.User.password).subscribe(response=>{
    console.log('login Successful',response);
    this.router.navigate([response.api]);
  },
  (error)=>{
    console.log('login failed',error);
  })
}

}

