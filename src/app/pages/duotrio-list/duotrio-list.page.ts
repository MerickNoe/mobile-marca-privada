import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DuoTrioTest } from '../../entities/duotrio.interface';
import { DuotrioService } from 'src/app/services/duotrio.service';
import { ModalController } from '@ionic/angular';
import { DuotrioAnswerPage } from '../duotrio-answer/duotrio-answer.page';


@Component({
  selector: 'app-duotrio-list',
  templateUrl: './duotrio-list.page.html',
  styleUrls: ['./duotrio-list.page.scss'],
})
export class DuotrioListPage implements OnInit {

  tests: Observable<DuoTrioTest[]>;

  constructor(
    private duotrioService: DuotrioService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getActives();
  }

  getActives() {
    this.tests = this.duotrioService.getActiveTest();
  }

  async answer(test: DuoTrioTest) {
    const modal = await this.modalController.create({
      component: DuotrioAnswerPage,
      cssClass: 'my-custom-modal',
      backdropDismiss: false,
      componentProps: {
        duotrioTest: test
      }
    });
    return await modal.present();
   }

}
