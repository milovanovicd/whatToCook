import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
 
  isLogin = true;

  constructor(
    private authService:AuthService,
    private router:Router,
    private loadingCtrl: LoadingController,
    private alertCtrl:AlertController) { }

  ngOnInit() {
  }

  onSwitchAuthMode(){
    this.isLogin=!this.isLogin;
  }
  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    console.log(email,password);

    if(this.isLogin){
      this.authService.login(email,password);
    }else{
      this.authService.signup(email,password);
    }
  }

  private showAlert(message:string){
    this.alertCtrl.create({header:'Autentifikacija neuspešna!', message:message,buttons:['Ok']}).then(alertEl =>{
      alertEl.present();
    })
  }

}
