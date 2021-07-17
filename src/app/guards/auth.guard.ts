import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedProfiles = next.data.allowedProfiles;
    const isAuthorized = this.auth.isAuthorized(allowedProfiles);

    if (!isAuthorized) {
      this.router.navigate(['/']);
    }

    return isAuthorized;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedProfiles = next.data.allowedProfiles;
    const isAuthorized = this.auth.isAuthorized(allowedProfiles);

    if (!isAuthorized) {
      this.router.navigate(['/']);
    }

    return isAuthorized;
  }
}
