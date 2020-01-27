import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Tests } from '../../../assets/data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tests = Tests;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}


  logOut() {
    try {
      this.authService.logOut();
      this.router.navigateByUrl('/login');
    } catch (error) {
      console.log('ERROR ', error);
    }
  }


  redirecTo(url: string) {
    this.router.navigateByUrl(url);  }
}
