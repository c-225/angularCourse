import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Assignment management application';
  opened = false; // For sidebar state

  constructor(
    private assignmentsService: AssignmentsService,
    public authService: AuthService,
    private router: Router
  ) { }

  async toggleAdmin(arg0: any) {
    if (await this.authService.isAdmin()) {
      console.log("Pas admin !");
      this.authService.setAdmin(false);
    } else {
      console.log("Admin !");
      this.authService.setAdmin(true);
    };
  }

  toggleSidebar() {
    this.opened = !this.opened;
  }

  generateTestData() {
    console.log("generating test data...");

    this.assignmentsService.peuplerBDavecForkJoin()
      .subscribe(() => {
        console.log("The database has been populated with test data.");
        window.location.href = '/home';
      });
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}