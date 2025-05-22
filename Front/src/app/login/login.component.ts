import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
      private authService: AuthService,
      private router: Router
    ) {}
    
    username = "";
    password = "";

    onSubmit(event:any) {
      if (this.authService.getUser(this.username,this.password)){
        this.router.navigate(['/home']);
        this.authService.login();
      }
      else {
        console.log('wrong password/username cuh');
      }
    }
}
