import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private langSubject: BehaviorSubject<string> = new BehaviorSubject<string>('kg');
  public lang$: Observable<string> = this.langSubject.asObservable();
  toggle(lang: string) {
    this.langSubject.next(lang);
  }
}
