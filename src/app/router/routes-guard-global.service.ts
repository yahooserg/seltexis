import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core'

import { AuthService } from '../services/auth.service'

@Injectable()
export class RoutesGuardGlobal implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {};

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.isAuthenticated()
      .then(
        (authenticated: boolean) => {
          if(authenticated) {
            return true;
          } else {
            this.router.navigate(['/global/login'])
          }
        }
      );
    }
  }