import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from './shared/auth.service';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from "./login/login.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsersComponent } from "./users/users.component";
import { GradesComponent } from "./grades/grades.component";
import { GradingList } from "./grades/grading-list/grading-list";
import { User } from './shared/users.model';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule, RouterOutlet, MatButtonModule, MatIconModule,
    MatDividerModule, RouterLink, MatSlideToggleModule, MatSidenavModule,
    FormsModule, MatToolbarModule,
    LoginComponent, HttpClientModule,
    GradingList
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Pronote';
  sidenavOpen = false;
  currentUser: any;

  constructor(private authService:AuthService, private router: Router) {}
  ngOnInit(): void {
    if (this.authService.loggedIn) this.router.navigate(['/home'])
    else this.router.navigate(['/login'])
  }

  login() {
    if(!this.authService.loggedIn) {
      this.authService.login();
    }
  }
  logout(){
    this.authService.logout();    
    this.router.navigate(['/login']);
  }

  isLoggedIn(){
    return this.authService.loggedIn
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
  isTeacher() {
    return this.authService.currentUser?.role === 'teacher';
  }
  isStudent() {
    return this.authService.currentUser?.role === 'student';
  }
}
