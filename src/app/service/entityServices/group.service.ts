import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Group} from "../../models/Group";
import {Observable} from "rxjs";
import ipAddress from "../../../assets/ipAddress.json"


const GROUP_API = 'http://' + ipAddress.ip +':8080/api/users/';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  createGroup(group: Group):Observable<any>{
    return this.http.post()
  }
}
