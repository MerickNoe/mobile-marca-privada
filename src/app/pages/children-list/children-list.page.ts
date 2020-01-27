import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChildrenTest } from 'src/app/entities/children.interface';
import { ChildrenService } from 'src/app/services/children.service';
import { ModalController } from '@ionic/angular';
import { ChildrenAnswerPage } from '../children-answer/children-answer.page';

@Component({
  selector: 'app-children-list',
  templateUrl: './children-list.page.html',
  styleUrls: ['./children-list.page.scss'],
})
export class ChildrenListPage implements OnInit {

  tests: Observable<ChildrenTest[]>;

  constructor(
    private childrenService: ChildrenService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getActives();
  }

  getActives() {
    this.tests = this.childrenService.getActiveTest();
  }

  async answer(test: ChildrenTest) {
    const modal = await this.modalController.create({
      component: ChildrenAnswerPage,
      cssClass: 'my-custom-modal',
      backdropDismiss: false,
      componentProps: {
        childrenTest: test
      }
    });
    return await modal.present();
   }

}
