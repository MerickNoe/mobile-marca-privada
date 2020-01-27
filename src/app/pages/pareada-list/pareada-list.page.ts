import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PareadaService } from '../../services/pareada.service';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { PareadaTest } from '../../entities/pareada.interface';
import { PareadaAnswerPage } from '../pareada-answer/pareada-answer.page';

@Component({
  selector: 'app-pareada-list',
  templateUrl: './pareada-list.page.html',
  styleUrls: ['./pareada-list.page.scss'],
})
export class PareadaListPage implements OnInit {

  tests: Observable<PareadaTest[]>;

  constructor(
    private router: Router,
    private pareadaService: PareadaService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getTests();
  }

  getTests() {
    this.tests = this.pareadaService.getActiveTest();
  }

  async answer(test: PareadaTest) {
    const modal = await this.modalController.create({
      component: PareadaAnswerPage,
      cssClass: 'my-custom-modal',
      backdropDismiss: false,
      componentProps: {
        pareadaTest: test
      }
    });
    return await modal.present();
   }

}
