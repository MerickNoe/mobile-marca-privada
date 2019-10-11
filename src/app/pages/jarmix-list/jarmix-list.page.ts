import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JarmixService } from 'src/app/services/jarmix.service';
import { ModalController } from '@ionic/angular';
import { JarMixTest } from 'src/app/entities/jarmix.interface';
import { Observable } from 'rxjs';
import { JarmixAnswerPage } from '../jarmix-answer/jarmix-answer.page';

@Component({
  selector: 'app-jarmix-list',
  templateUrl: './jarmix-list.page.html',
  styleUrls: ['./jarmix-list.page.scss'],
})
export class JarmixListPage implements OnInit {

  jarmixTest: JarMixTest[];
  all: Observable<JarMixTest[]>;

  constructor(
    private router: Router,
    private jarmixService: JarmixService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.all = this.jarmixService.getAllActives();
   }

   async answer(test: JarMixTest) {
    const modal = await this.modalController.create({
      component: JarmixAnswerPage,
      cssClass: 'my-custom-modal',
      componentProps: {
        jarMixTest: test
      }
    });
    return await modal.present();
   }

}
