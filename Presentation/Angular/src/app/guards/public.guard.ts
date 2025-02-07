import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../api/services';

@Injectable({ providedIn: 'root' })
export class PublicGuard {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUser;

    if (currentUser) this.authService.logout();

    return true;
  }
}
