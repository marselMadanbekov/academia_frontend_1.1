import {Injectable} from '@angular/core';
import ipAddress from "../../../assets/ipAddress.json"
import {HttpClient} from "@angular/common/http";
import {Branch} from "../../models/Branch";
import {Observable} from "rxjs";


const BRANCH_API = 'http://' + ipAddress.ip + ':8080/api/branch/';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) {
  }

  createBranch(branch: { town: any; name: string }): Observable<any> {
    return this.http.post(BRANCH_API + 'create', branch);
  }

  getBranches(): Observable<any> {
    return this.http.get(BRANCH_API + 'getAll');
  }

  getMainGeneralInfo(): Observable<any> {
    return this.http.get(BRANCH_API + 'general')
  }
}
