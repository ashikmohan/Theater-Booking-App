import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
import jwt_decode from "jwt-decode";

interface MyToken {
  data:{
    role: string,
    username: string,    
  }

}

export const userGuard: CanActivateFn = (route, state) => {
  const router= new Router

  const token=localStorage.getItem('token') || '';
  console.log("Token from user",token)
try{
  var user =jwt_decode<MyToken>(token);
  console.log(user)
  if(user.data.role=="user"){
    return true
  }else{
    
    Swal.fire({
      icon: 'error',
      title: 'Access Denied',
      text: 'You do not have permission to access this page.',
      
    })
    
    return false;
  }
} catch(error){
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
