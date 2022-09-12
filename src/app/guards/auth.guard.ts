import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataProvider } from './../providers/data.provider';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private dataProvider: DataProvider, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return true
    if (this.dataProvider.loggedIn) {
      return true;
    } else {
      if (environment.production) {
        this.router.navigate(['./login']);
        return false;
      } else {
        return true;
      }
    }
  }
}
