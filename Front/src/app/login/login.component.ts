import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { UsersService } from '../shared/users.service';
import { MatCardModule } from '@angular/material/card';
import { User } from '../shared/users.model';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
      private usersService: UsersService,
      private authService: AuthService,
      private router: Router
    ) {}

    users: User[] = [];

    username = "";
    password = "";

    onSubmit() {
      const user = this.authService.getUser(this.username, this.password);
      if (user) {
        this.router.navigate(['/home']);
        this.authService.login();
      } else {
        console.error('Invalid username or password');
      }
    }

    getUsers() {
      this.usersService.getUsers().subscribe(users => {
        (users: User[]) => this.users = users;
      }
      );
    }

    onInit() {
      this.getUsers();
    }
}
