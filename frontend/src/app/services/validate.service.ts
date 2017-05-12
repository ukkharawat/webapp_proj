import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateUser(user){
    if(user.username == undefined ){
      return "Username is required"
    }else if( user.username.length < 6 ){
      return "Username must have at least 6 characters"
    }else if(user.password == undefined){
      return "Password is required"
    }else if(user.password.length < 8 ){
      return "Password must have at least 8 characters"
    }else{
      return "success"
    }
  }

  matchPassword(password , repassword){
    return password == repassword
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }
}
