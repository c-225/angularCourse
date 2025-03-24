import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username: string = '';
    password: string = '';

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }

    onSubmit() {
        if (this.authService.logIn(this.username, this.password)) {
            this.snackBar.open('Logged in successfully!', 'Close', { duration: 2000 });
            this.router.navigate(['/home']);
        } else {
            this.snackBar.open('Username or password incorrect', 'Close', { duration: 2000 });
        }
    }

    ngOnInit() {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/home']);
        }
    }
}
