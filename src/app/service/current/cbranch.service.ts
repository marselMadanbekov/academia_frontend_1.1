import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Branch} from "../../models/Branch";

@Injectable({
  providedIn: 'root'
})
export class CbranchService {
  private currentGroupSubject: BehaviorSubject<Branch | null> = new BehaviorSubject<Branch | null>(null);
  public currentGroup$ = this.currentGroupSubject.asObservable();

  setCurrentGroup(branch: Branch): void {
    this.currentGroupSubject.next(branch);
  }
}
