import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { User } from "./user.model";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _userIsAuthenticated = true;
  private _userId = 'user1';

  // private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  public get userId() {
    // return this.user.;
    return this._userId;
    //.asObservable().pipe(
    //   map((user) => {
    //     if (user) {
    //       return user.id;
    //     } else {
    //       return null;
    //     }
    //   }) 
    // );
  }

  public get userIsAuthenticated() {
    return this._userIsAuthenticated;
    // return this._user.asObservable().pipe(
    //   map((user) => {
    //     if (user) {
    //       return !!user.token;
    //     } else {
    //       return false;
    //     }
    //   })
    // ); //!! <- boolean konverzija
  }

  signup(email: string, password: string) {
  }

  login(email: string, password: string) {
  }

  logout() {
    // this._user.next(null);
    this._userIsAuthenticated=false;
  }
}
