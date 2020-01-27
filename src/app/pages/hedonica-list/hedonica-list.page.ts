import { Component, OnInit } from '@angular/core';
import { HedonicaTest } from '../../entities/hedonica.interface';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { HedonicaService } from '../../services/hedonica.service';
import { HedonicaAnswerPage } from '../hedonica-answer/hedonica-answer.page';

@Component({
  selector: 'app-hedonica-list',
  templateUrl: './hedonica-list.page.html',
  styleUrls: ['./hedonica-list.page.scss'],
})
export class HedonicaListPage implements OnInit {

  tests: Observable<HedonicaTest[]>;

  constructor(
    private modalController: ModalController,
    private hedonicaService: HedonicaService
  ) { }

  ngOnInit() {
    this.getTests();
  }

  getTests() {
    this.tests = this.hedonicaService.getActiveTest();
  }

  async answer(test: HedonicaTest) {
    const modal = await this.modalController.create({
      component: HedonicaAnswerPage,
      cssClass: 'my-custom-modal',
      backdropDismiss: false,
      componentProps: {
        hedonicaTest: test
      }
    });
    return await modal.present();
   }

}
