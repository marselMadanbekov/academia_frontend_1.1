import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {map, Observable, take} from 'rxjs';
import {UserService} from "../service/entityServices/user.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {
  constructor(private router: Router,
              private userService: UserService) {
  }

  canActivate(): Observable<boolean> {
    return this.userService.getRole().pipe(
      take(1),
      map(role => {
        console.log(role);
        if (role === 'ROLE_SUPER_ADMIN' || role === "ROLE_BRANCH_OWNER") {
          return true;
        }
        else if (role === 'ROLE_ADMIN'){
          this.router.navigate(['admin']);
          return false;
        }
        else {
          this.router.navigate(['main-user']);
          return false;
        }
      })
    );
  }
}
