import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from './user/user.service';
import { environment } from 'src/environments/environment';

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
    this.http.post<{token: string, userId:string}>(`${environment.API_URL}/auth/login`, {username, password})
        .subscribe(podaci => {
            this.token.next(podaci);
            localStorage.setItem('userToken', podaci.token);
            this.userService.setUserId(podaci.userId);
            this.router.navigate(['/']);
        },error =>{
          this.authAlert("Invalid email or password! Please try again","Invalid Login");
        });
  }

  signup(email: string, password: string) {
    email = email.trim();
    return this.http.post<{message: string}>(`${environment.API_URL}/users/signup`, {email, password})
    .subscribe(res =>{
      this.authAlert(res.message,"Sign up");
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


  async authAlert(message:string, header:string) {
    const alert = await this.alertController.create({
      header: header,
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
