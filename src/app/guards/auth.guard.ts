import { CanActivateFn, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const token = inject(AuthService).getToken();
  const router = inject(Router);
  console.log(token);
  if(token){
    return true;
  }
  router.navigate(["login"]);
  return false;
};

export const userLoggedGuard: CanActivateFn =(route,state)=>{
  const token = inject(AuthService).isAuthenticated();
  const router = inject(Router);
  console.log(token);
  if(token){
    router.navigate(["dashboard"]);
    return false;
  }

  return true;
};
