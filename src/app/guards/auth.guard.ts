import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) {}


  canActivate() {

    if ( this.auth.authenticated() ) { return true;
    } else {
     this.router.navigateByUrl('/login');
     return false;
    }
}

}
