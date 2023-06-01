import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Group} from "../../models/Group";

@Injectable({
  providedIn: 'root'
})
export class CgroupService {
  private currentGroupSubject: BehaviorSubject<Group | null> = new BehaviorSubject<Group | null>(null);
  public currentGroup$ = this.currentGroupSubject.asObservable();

  setCurrentGroup(group: Group): void {
    this.currentGroupSubject.next(group);
  }
}
