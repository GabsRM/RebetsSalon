import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../api/services';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private authService: AuthService) { }

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUser;

    return !!currentUser;
  }
}
