import { Injectable, OnInit } from '@angular/core';
import { User } from './users.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  users!: User[];
  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  constructor(
    private userService: UsersService,
    private router: Router,

  ) { }

  currentUser:User |undefined;
  loggedIn!:boolean|null;

  
  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false
    this.currentUser = undefined;
  }

  isAdmin(){
    return new Promise<boolean>((resolve) => {
      if (this.currentUser) {
        resolve(this.currentUser.isAdmin);
      } else {
        resolve(false);
      }
    });
  }

  getUser(username:string, password:string): boolean{
    console.log(typeof(this.users));
    if (this.users.length === 0) {
      console.error('User list is empty, fetch users.');
      return false;
    }

    const user = this.users.find(user => user.username === username && user.password === password);
    if (user) {
      this.currentUser = user;
      return true;
    } else {
      console.error('Invalid username or password');
      return false;
    }
  }

  getUsers() {
      this.userService.getUsers().subscribe(users => this.users = users);
    }

}
