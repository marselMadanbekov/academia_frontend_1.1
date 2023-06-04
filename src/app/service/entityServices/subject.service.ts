import {Injectable} from '@angular/core';
import ipAddress from "../../../assets/ipAddress.json"
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Subject} from "../../models/Subject";


const SUBJECT_API = 'http://' + ipAddress.ip + ':8080/api/subject/';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) {
  }


  createSubject(subject: { name: string; cost_per_lesson: number; branchId: number }): Observable<any> {
    return this.http.post(SUBJECT_API + "create", subject);
  }

  getAllSubjects(): Observable<any> {
    return this.http.get(SUBJECT_API);
  }

  updateSubject(id: number, subject: Subject): Observable<any> {
    return this.http.put(SUBJECT_API + ":" + id + "/update", subject);
  }

  deleteSubject(subjectId: number | undefined): Observable<any> {
    return this.http.delete(SUBJECT_API + "delete/" + subjectId)
  }

  getSubjectsByBranch(branchId: number): Observable<any> {
    return this.http.get(SUBJECT_API + 'getByBranch/' + branchId);

  }
}
