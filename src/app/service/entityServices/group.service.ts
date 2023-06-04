import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

  createGroup(group: { branchId: number; teacher: User; subject: Subject; name: string }):Observable<any>{
    return this.http.post(GROUP_API + 'create',group);
  }

  getGroupsByBranch(branchId: number): Observable<any>{
    return this.http.get(GROUP_API + 'getByBranch/' + branchId);
  }

  deleteGroup(groupId: number):Observable<any> {
    return this.http.delete(GROUP_API + groupId);
  }
}
