import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Group} from "../../models/Group";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class CuserService {
  private currentGroupSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentGroup$ = this.currentGroupSubject.asObservable();

  setCurrentGroup(user: User): void {
    this.currentGroupSubject.next(user);
  }
}
