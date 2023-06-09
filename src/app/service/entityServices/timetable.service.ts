import {Injectable} from '@angular/core';
import ipAddress from "../../../assets/ipAddress.json";
import {HttpClient} from "@angular/common/http";
import {Timetable} from "../../models/Timetable";
import {Observable} from "rxjs";

const TIMETABLE_API = 'http://' + ipAddress.ip + ':8080/api/timetable/';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor(private http:HttpClient) {
  }

  createTimetableToGroup(groupId:number, timetable: Timetable):Observable<any>{
    return this.http.post(TIMETABLE_API + 'create/' + groupId,timetable);
  }
}
