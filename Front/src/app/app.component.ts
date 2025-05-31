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
import { Users } from "./users/users.component";

@Component({
  selector: 'app-root',
  imports: [
    CommonModule, RouterOutlet, MatButtonModule, MatIconModule,
    MatDividerModule, RouterLink, MatSlideToggleModule, MatSidenavModule,
    FormsModule, MatToolbarModule,
    LoginComponent, HttpClientModule,
    Users
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Assignment Management App';
  sidenavOpen = false;

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
}
