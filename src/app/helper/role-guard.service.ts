import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {CRoleService} from "../service/current/c-role.service";
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {TokenStorageService} from "../service/token-storage.service";
import {state} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {
  constructor(private router: Router,
              private tokenService: TokenStorageService,
              private roleService: CRoleService) {
  }

  canActivate(): Observable<boolean> {
    const currentUser = this.tokenService.getUser();
    if (currentUser) {
      return this.roleService.currentRole$.pipe(
        switchMap(role => {
          if (role === 'ROLE_SUPER_ADMIN' || role === "ROLE_BRANCH_OWNER") {
            this.router.navigate(['main-admin']);
            return of(false);
          } else{
            this.router.navigate(['/main-user']);
            return of(false);
          }
        })
      );
    }else{
      this.router.navigate(['login']);
      return of(false);
    }
  }
}
