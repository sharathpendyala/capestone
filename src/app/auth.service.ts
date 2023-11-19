import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedin():boolean{
    if(localStorage.getItem("userId")!=null)
      return true;
    return false;
  }
}
