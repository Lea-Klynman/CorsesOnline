import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { partUser, User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  public isAuth: boolean = false;
  public userId: number = 0;
  public role = "";
  public isTeacher: boolean = this.role == 'teacher' ? true : false;
  constructor(private http: HttpClient) { }
  register(user: User) : Observable<any>{
      return this.http.post(`${this.apiUrl}/register`, user);
    }
  
    login(credentials: partUser): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, credentials);
    }
}
