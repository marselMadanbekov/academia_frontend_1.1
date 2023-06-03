import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Group} from "../../models/Group";
import {Observable} from "rxjs";
import ipAddress from "../../../assets/ipAddress.json"
import {User} from "../../models/User";
import {Subject} from "../../models/Subject";


const GROUP_API = 'http://' + ipAddress.ip +':8080/api/groups/';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  createGroup(group: { teacher: User; subject: Subject; name: string }):Observable<any>{
    return this.http.post(GROUP_API + 'create',group);
  }
}
