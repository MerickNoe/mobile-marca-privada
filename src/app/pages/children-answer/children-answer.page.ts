import { Component, OnInit, Input } from '@angular/core';
import { ChildrenTest, ChildrenAnswer, ChildrenAnswerMix } from '../../entities/children.interface';
import { ModalController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { ChildrenService } from '../../services/children.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-children-answer',
  templateUrl: './children-answer.page.html',
  styleUrls: ['./children-answer.page.scss'],
})
export class ChildrenAnswerPage implements OnInit {
  @Input() childrenTest: ChildrenTest;

  today = new Date();

  answer: ChildrenAnswer = {
    test: '',
    date: '',
    name: '',
    general: null
  };

  visible = 0;

  buttons = [true, false, true];

  typeMix = 0;

  answerMix: ChildrenAnswerMix = {
    test: '',
    date: '',
    name: '',
    generalMix1: null,
    generalMix2: null
  };

  buttonsMix = [true, false, false, true];


  constructor(
    private modalController: ModalController,
    private childrenService: ChildrenService,
    private datePipe: DatePipe,
    private alertController: AlertController
  ) {
   }

  ngOnInit() {
    if (Number(this.childrenTest.mix) === 1) {
      this.typeMix = 1;
      this.answer.date = this.datePipe.transform(this.today, 'dd-MM-yyyy');
      this.answer.test = this.childrenTest.id;
    } else {
      this.typeMix = 2;
      this.answerMix.date = this.datePipe.transform(this.today, 'dd-MM-yyyy');
      this.answerMix.test = this.childrenTest.id;
    }

  }

  close() {
    this.modalController.dismiss();
  }

  next() {
    this.visible = this.visible + 1;
   }


   back() {
    this.visible = this.visible - 1;
  }

 async save() {
   try {
    const res = await this.childrenService.create(this.answer);
    if (res) {
     this.presentAlert('Ha finalizado la encuesta exitosamente.');
    }
   } catch (error) {
    this.presentAlert('Error interno.');
   }
  }

  enableNext() {
    this.buttons[this.visible] = true;
  }

  async saveMix() {
    try {
    const res = await this.childrenService.createMix(this.answerMix);
    if (res) {
      this.presentAlert('Ha finalizado la encuesta exitosamente.');
     }
    } catch (error) {
      this.presentAlert('Error interno.');
     }
  }

  enableNextMix() {
    this.buttonsMix[this.visible] = true;
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Aceptar',
          handler: (exit) => {
                  this.modalController.dismiss();
                }
        }]
    });

    await alert.present();
  }
}
