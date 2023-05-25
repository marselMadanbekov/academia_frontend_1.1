import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import ipAddress from "../../assets/ipAddress.json"

const AUTH_API = "http://" + ipAddress.ip + ":8080/api/auth/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public login(user: any): Observable<any> {
    return this.http.post(AUTH_API + "signIn", {
      username: user.username,
      password: user.password
    });
  }


  public getUsersRole(): Observable<any> {
    return this.http.get(AUTH_API);
  }

  public register(user: any): Observable<any> {
    return this.http.post(AUTH_API + "signUp", {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      fathersName: user.fathersName,
      email: user.email,
      role: user.role,
      address: user.address,
      phoneNumber: user.phoneNumber,
      password: user.password,
      confirmPassword: user.confirmPassword,
      age: user.age
    });
  }
}
