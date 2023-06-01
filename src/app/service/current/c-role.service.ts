import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CRoleService {
  private currentRoleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public currentRole$ = this.currentRoleSubject.asObservable();

  setCurrentRole(role:string): void {
    this.currentRoleSubject.next(role);
  }
}
