import { Injectable } from '@angular/core';
import ipAddress from "../../../assets/ipAddress.json";
import {HttpClient} from "@angular/common/http";
import {Mark} from "../../models/Mark";
import {Observable} from "rxjs";
import {Subject} from "../../models/Subject";

const MARK_API = 'http://' + ipAddress.ip + ':8080/api/mark';

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  constructor(private http: HttpClient) { }

  createMark(mark: { total_questions: number; subject: { id: number }; correct_answers: any; userId: number; topic:string | undefined}): Observable<any>{
    return this.http.post(MARK_API + '/create',mark)
  }
}
