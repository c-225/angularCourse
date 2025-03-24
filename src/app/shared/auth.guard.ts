import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  let authService = inject(AuthService);
  let router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
      console.log("Not authenticated, redirecting to login");
      router.navigate(['/login']);
      return false;
  }
};