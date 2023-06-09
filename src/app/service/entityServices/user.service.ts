import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import ipAddress from "../../../assets/ipAddress.json"
import {User} from "../../models/User";


const USER_API = 'http://' + ipAddress.ip + ':8080/api/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  createUserByBranch(user: { firstname: string | null | undefined; password: string | null | undefined; role: any; address: string | null | undefined; phone_number: string | null | undefined; email: string | null | undefined; age: string | null | undefined; lastname: string | null | undefined; username: string | null | undefined; confirm_password: string | null | undefined; branchId: number }): Observable<any> {
    return this.http.post(USER_API + 'create', user);
  }
  createUserByGroup(user: { firstname: string | null | undefined; password: string | null | undefined; role: any; address: string | null | undefined; phone_number: string | null | undefined; email: string | null | undefined; age: string | null | undefined; lastname: string | null | undefined; username: string | null | undefined; confirm_password: string | null | undefined; branchId: number }, groupId:number):Observable<any>{
    return this.http.post(USER_API + 'createByGroup/' + groupId, user);
  }

  getBranchOwners(): Observable<any> {
    return this.http.get(USER_API + 'getBranchOwners');
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(USER_API + id);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(USER_API + username)
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(USER_API);
  }

  getAllPupils(branchId: number): Observable<any> {
    return this.http.get(USER_API + 'pupils/byBranch/' + branchId);
  }

  getAllTeachers(): Observable<any> {
    return this.http.get(USER_API + 'teachers/');
  }

  getMembersOfGroup(groupId: number | undefined): Observable<any> {
    return this.http.get(USER_API + groupId + "/members");
  }

  updateUser(user: any, targetUsername: string): Observable<any> {
    return this.http.put(USER_API + targetUsername + "/update", user);
  }

  getRole(): Observable<string> {
    return this.http.get<string>(USER_API + "role");
  }

  deleteUser(userId: number | undefined) : Observable<any>{
    return this.http.delete(USER_API + 'delete/' + userId);
  }

  getPupilsByBranch(branchId: number): Observable<any> {
    return this.http.get(USER_API + "pupils/getByBranch/" + branchId);
  }
  getTeachersByBranch(branchId: number): Observable<any> {
    return this.http.get(USER_API + "teachers/getByBranch/" + branchId);
  }
}
