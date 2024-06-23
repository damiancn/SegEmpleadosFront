// import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from "@angular/router";
import { map } from 'rxjs';
import { AuthService } from '../services/authservice.service';
export const authGuart: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.getCredencial().pipe(
    map(credencial => {
      if (!credencial) {
        authService.rutaRedireccion = state.url;
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  )
};
