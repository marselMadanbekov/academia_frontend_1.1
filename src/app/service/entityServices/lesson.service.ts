import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import ipAddress from "../../../assets/ipAddress.json";
import {Lesson} from "../../models/Lesson";
import {Observable} from "rxjs";
import {UserAttend} from "../../models/UserAttend";
import {Group} from "../../models/Group";

const LESSON_API = 'http://' + ipAddress.ip + ':8080/api/lesson/';
@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) { }

  createLesson(lesson: { attendance: UserAttend[]; group: Group }) : Observable<any>{
    console.log(lesson.attendance);
    return this.http.post(LESSON_API + "create",lesson);
  }

  updateLesson(targetLessonId: number, lesson: Lesson){
    return this.http.put(LESSON_API + targetLessonId + "/update", lesson);
  }

  getLessonById(lessonId: number): Observable<any>{
    return this.http.get(LESSON_API + lessonId);
  }
}
