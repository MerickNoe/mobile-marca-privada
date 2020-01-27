import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user.class';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = new User();

  constructor(
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewDidLeave() {
    this.user = new User();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

 async onLogIn() {

  try {

    const result = await
    this.authService.logIn(this.user);

    if ( result.user ) {
       this.router.navigateByUrl('/home');
    }

  } catch (error) {

    if (error.code) {
      this.presentAlert(error.message);
    }

  }

  }


  validate() {
    if (this.authService.authenticated()) {
      this.router.navigateByUrl('/home');
    }
  }

  ionViewWillEnter() {
    this.validate();
  }

}
