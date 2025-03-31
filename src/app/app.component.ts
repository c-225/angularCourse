import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from './shared/auth.service';


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, MatButtonModule, MatIconModule, MatDividerModule, RouterLink, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Assignment Management App';

  constructor(private authService:AuthService, private router: Router) {}

  login() {
    if(!this.authService.loggedIn) {
      this.authService.login();
    }
    else {
      this.authService.logout();
      this.router.navigate(['/home']);
    }
  }
}
