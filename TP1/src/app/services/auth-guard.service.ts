import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs-compat/Observable';
import { AuthService } from './auth.service';

@Injectable()

export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, private route:Router){ }

 canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
      if(this.authService.isAuth)
        return true;
      else
        return new Promise<boolean>((resolve, reject) => {
          resolve(this.redirectToAuth())
        })
  }

  redirectToAuth(){
    this.route.navigate(["auth"]);
    return true;
  }

}
