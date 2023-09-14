import { Component } from '@angular/core';
import { AuthserveService } from '../authserve.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private authserve:AuthserveService,private router:Router) { }
User={
  name:'',
  username:'',
  phoneNumber:null,
  password:'',
  confirmPassword:''
}
isconfirmPasswordInvalid(): boolean {
  return this.User.password !== this.User.confirmPassword;
}
SignUp(){
  console.log(`Function called ${this.User}`)
  this.authserve.SignUp(this.User).subscribe((res:any)=>{
    console.log('SignUp Success');
    this.router.navigate(['/login']);
  },(error)=>{
    console.log('SignUp Failed',error);
  })

}

}
