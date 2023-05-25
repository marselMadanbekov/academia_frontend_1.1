import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{
  constructor(private router: Router,
              // private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
    // return this.userService.getRole().pipe(
    //   take(1),
    //   map(role => {
    //     console.log(role);
    //     if (role === 'ROLE_ADMIN') {
    //       console.log(true);
    //       return true;
    //     }
    //     else {
    //       console.log(false);
    //       return false;
    //     }
    //   })
    // );
    return true;
  }
}
