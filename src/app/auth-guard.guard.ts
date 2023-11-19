import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

 

export const authGuardGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  if(authService.isLoggedin())
  {
    return true;
  }
  else{
    router.navigate([""]);
    return false;
  }
};
