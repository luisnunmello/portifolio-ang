import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';
import { firstValueFrom, skip } from 'rxjs';

export const adminGuard: CanActivateFn = async (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isLoading.value === true) {
      const val = await firstValueFrom(loginService.isLoading.pipe(skip(1)))
      
  }
  if (!loginService.loggedIn()) {
        router.navigate(["/admin"]);
        return false;
    }
  
  return true;
};
