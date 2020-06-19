import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: "root",
})
export class AuthService {


  // private _user = new BehaviorSubject<User>(null);
  token = new BehaviorSubject<{token: string}>(null);

  constructor(private http: HttpClient,
              private router: Router,
              private alertController: AlertController,
              private userService:UserService) {}

  //email
  login(email: string, password: string) {
    const username = email.trim();
    this.http.post<{token: string, userId:string}>('http://localhost:3000/auth/login', {username, password})
        .subscribe(podaci => {
            this.token.next(podaci);
            localStorage.setItem('userToken', podaci.token);
            this.userService.setUserId(podaci.userId);
            this.router.navigate(['/']);
        });
  }

  signup(email: string, password: string) {
    email = email.trim();
    return this.http.post<{message: string}>('http://localhost:3000/users/signup', {email, password})
    .subscribe(res =>{
      this.userSignedUp(res.message);
    });
  }

  logout() {
      this.token.next(null);
      localStorage.removeItem('userToken');
      this.router.navigate(['/auth']);
  }

  // autoLogin() {
  //     const token = localStorage.getItem('userToken');
  //     console.log('token: ' + token);
  //     if (!token) {
  //         return;
  //     }
  //     this.token.next({token});
  // }


  async userSignedUp(message:string) {
    const alert = await this.alertController.create({
      header: "Sign Up",
      message: message,
      buttons: ['OK']});

    await alert.present();
  }

  
  // public get userIsAuthenticated() {
  //   return this._userIsAuthenticated;

  // }

  // login(email: string, password: string) {
  // }

  // logout() {
  //   // this._user.next(null);
  //   this._userIsAuthenticated=false;
  // }
}
