import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDivider } from '@angular/material/divider';
import { MatListModule} from '@angular/material/list';
import { RouterLink, Router } from '@angular/router';

import { SubmittedDirective } from '../shared/submitted.directive';
import { NotSubmittedDirective } from '../shared/notSubmitted.directive';
import { User } from './users.model';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-users',
  imports: [
    CommonModule, FormsModule,
    //Angular Material
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatDatepickerModule, MatNativeDateModule,  MatListModule, RouterLink,],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  firstName = "";
  lastName = "";
  username = "";
  addActive = false;
  selectedUser!:User;
  transmittedUser: any;
  formVisible = false;
  users!: User[];
  subjects: string[] = [];

  constructor(
    private userService: UsersService,
    private router: Router) { }
  
    ngOnInit(): void{
      this.getUsers();
    }
  
    onSubmit(event:any) {
      console.log(event);
      const newUser = new User();
      newUser.firstName = this.firstName;
      newUser.lastName = this.lastName;
      newUser.username = this.username;
      newUser.subjects = this.subjects;
  
      this.users.push(newUser)
      this.transmittedUser = this.users[0]
    }
  
    clickedUser(user:User) {
      console.log(user.id, user.username);
      this.selectedUser = user;
    }
    onAddUserBtnClick() {
      //this.formVisible = true;
    }
  
    getUsers(){
      this.userService.getUsers().subscribe(users => this.users = users);
    }
    

    /*
    onNewUser(event:User){
      this.userService.addUser(event).subscribe(message => console.log(message))
      this.formVisible = false;
    }
    */
  
  }