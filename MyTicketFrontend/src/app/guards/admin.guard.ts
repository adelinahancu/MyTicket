import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const isAdmin=localStorage.getItem('isAdmin')==='true';
  return isAdmin;
};
