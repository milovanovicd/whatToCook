import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userId = 'user1';

  constructor() { }

  public get userId() {
    return this._userId;
  }
}
