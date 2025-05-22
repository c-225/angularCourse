import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  let authService = inject(AuthService);
  let router = inject(Router);

  return authService.isAdmin().then( authentified => {
    if (authentified) {
      console.log("You are admin, you can navigate!");
      return true;
    } else {
      console.log("You are not admin, you cannot navigate!");
      router.navigate(['/home']);
      return false;
    }
  });
  return false;
};
