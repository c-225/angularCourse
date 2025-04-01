import { Injectable } from '@angular/core';
import { User } from './users.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser:User |undefined;
  loggedIn!:boolean|null;

  users: User[] = [
    {id:1, username:"MaxiCurry", password:"Sauce", isAdmin:false},
    {id:2, username:"Saucy_Santana", password:"fruit", isAdmin:true},
    {id:3, username:"Admin", password:"admin", isAdmin:true},
    {id:4, username:"Invincible", password:"Oliver", isAdmin:false},
    {id:5, username:"Marvel", password:"Rivals", isAdmin:false},
  ]

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false
    this.currentUser = undefined;
  }

  isAdmin(){
    const isUserAdmin = new Promise<boolean>(
      (resolve, reject) => {
        resolve(this.currentUser?.isAdmin || false);
      });
    return isUserAdmin;
  }

  getUser(username:string, password:string): boolean{
    const user: User|undefined = this.users.find(u => (u.password==password && u.username==username));
    if (user) {
      this.currentUser = user;
      return true;
    }
    else return false;
  }

  constructor() { }
}
