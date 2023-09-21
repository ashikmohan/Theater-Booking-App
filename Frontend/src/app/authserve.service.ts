import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap,  } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthserveService {

  private apiUrl='http://localhost:3000/ticket-booking';
  constructor(private http:HttpClient) { }

  // signUp
  SignUp(user:any){
    console.log(`Connecting to Server ${user}`)
    return this.http.post<any>(`${this.apiUrl}/Signup`,user);
    
  }


  login(username:string,password:string):Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,{username,password}).pipe(
      tap((response:any)=>{
        if(response && response.token){
          localStorage.setItem('token',response.token);
        }
      })
    )
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }
  
logout(): void{
  localStorage.removeItem('token');
}


getToken(): string | null{
  return localStorage.getItem('token');
}
}
