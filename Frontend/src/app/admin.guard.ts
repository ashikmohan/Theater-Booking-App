import { CanActivateFn, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';

interface MyToken {
  data:{
    role: string,
    username: string,    
  }

}

export const adminGuard: CanActivateFn = (route, state) => {
  const router= new Router
  var token = localStorage.getItem('token') || '';
  console.log("Token from admin",token)

  try {
    var user = jwt_decode<MyToken>(token);
    console.log(user)
    if (user.data.role=="admin"){
      return true
    }else{
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        
      })
     
      return false;
    }
  } catch (error) {
    console.log('Token error', error)
    
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
     
    })
   
    return false
  }

 return true;
 
};
