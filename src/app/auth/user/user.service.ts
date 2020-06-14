import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userId;

  constructor() { }

  setUserId(userId: string) {
    this._userId = userId;
    console.log(this._userId);
  }

  public get userId() {

    return this._userId;

  }
    //GET USER ID;
}
