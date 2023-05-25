import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import ipAddress from "../../assets/ipAddress.json"

const TRENAJER_API = 'http://' + ipAddress.ip + ':8080/api/trenajer/'

@Injectable({
  providedIn: 'root'
})
export class TrenajerService {
  stack: any[] = [];

  currentTask!: string;
  currentDigits!: number;
  currentCount!: number;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  loadTasks(taskName: string, digits: number, count: number): Observable<any> {
    return this.http.get(TRENAJER_API + taskName + "/" + digits + "/" + count + "/" + 12);
  }

  async fillStack(taskName: string, digits: number, count: number) {
    try {
      this.stack = [];
      const data = await this.loadTasks(taskName, digits, count).toPromise();
      for (let i = 0; i < data.length; i++) {
        this.push(data[i]);
      }
      console.log('myStack');
      console.log(this.stack);
    } catch (error) {
      this.router.navigate(['errorPage']);
      console.log(error);
    }
  }

  async getArray(taskName: string, digits: number, count: number): Promise<any> {
    if(this.isEmpty() || this.currentTask === null || (this.currentTask !== taskName || this.currentDigits !== digits || this.currentCount != count)){
      await this.fillStack(taskName, digits, count);
      this.currentTask = taskName;
      this.currentDigits = digits;
      this.currentCount = count;
    }
    return this.pop();
  }
  push(value: any[]) {
    this.stack.push(value);
  }

  pop() {
    return this.stack.pop();
  }

  peek() {
    return this.stack[this.stack.length - 1];
  }

  isEmpty() {
    return this.stack.length === 0;
  }
}
