import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DODTest } from '../../entities/dod.interface';
import { ModalController } from '@ionic/angular';
import { DodService } from 'src/app/services/dod.service';
import { DodAnswerPage } from '../dod-answer/dod-answer.page';

@Component({
  selector: 'app-dod-list',
  templateUrl: './dod-list.page.html',
  styleUrls: ['./dod-list.page.scss'],
})
export class DodListPage implements OnInit {

  tests: Observable<DODTest[]>;

  constructor(
    private modalController: ModalController,
    private dodService: DodService
  ) { }

  ngOnInit() {
    this.getTests();
  }

  getTests() {
    this.tests = this.dodService.getActiveTest();
  }

  async answer(test: DODTest) {
    const modal = await this.modalController.create({
      component: DodAnswerPage,
      cssClass: 'my-custom-modal',
      backdropDismiss: false,
      componentProps: {
        dodTest: test
      }
    });
    return await modal.present();
   }

}
