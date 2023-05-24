import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class SidebarService {
  private isSidebarOpenSubject = new BehaviorSubject<boolean>(false);
  isSidebarOpen$ = this.isSidebarOpenSubject.asObservable();

  toggle() {
    this.isSidebarOpenSubject.next(!this.isSidebarOpenSubject.value);
  }
}
