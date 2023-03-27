import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs-compat/Observable';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { SignUp } from '../models/signup.model';


@Injectable({ providedIn: 'root' })

export class HttpService {
  private serverUrl = 'http://localhost:8080/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  public login(signup: SignUp): Observable<any> {
    const params = new HttpParams()
      .set("username", signup.username)
      .set("password", signup.password);
    return this.http.get(this.serverUrl + "auth/" + signup.username + "&" + signup.password);
  }

  public register(user: SignUp): Observable<any> {
    return this.http.post<SignUp>(this.serverUrl + "auth", user, this.httpOptions);
  }

  public getUsers(): Observable<any> {
    return this.http.get(this.serverUrl + 'users');
  }

  public createUser(user: User): Observable<any> {
    return this.http.post<User>(this.serverUrl + 'users', user, this.httpOptions);
  }

  public suppUser(email: string): Observable<any> {
    return this.http.delete<any>(this.serverUrl + 'users/' + email, { observe: 'response' });
  }

}
