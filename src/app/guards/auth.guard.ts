import { CanActivateFn } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).JWT!==null ? true : false
};
