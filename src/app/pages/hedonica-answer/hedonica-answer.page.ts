import { Component, OnInit, Input } from '@angular/core';
import { HedonicaTest, HedonicaAnswer, StrangeModel } from '../../entities/hedonica.interface';
import { formatDate, DatePipe } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { PareadaService } from '../../services/pareada.service';
import { HedonicaAcceptancePage } from '../hedonica-acceptance/hedonica-acceptance.page';

@Component({
  selector: 'app-hedonica-answer',
  templateUrl: './hedonica-answer.page.html',
  styleUrls: ['./hedonica-answer.page.scss'],
})
export class HedonicaAnswerPage implements OnInit {
  @Input() hedonicaTest: HedonicaTest;

  today = new Date();

  totalJAR = 0;
  visible = 0;
  count = 0;

  answer: HedonicaAnswer = {
    test: '',
    name: '',
    date: '',
    hedonica: [],
    tipoJar: [],
    strange: [],
    general: null,
    corresponde: [],
    noCorresponde: [],
    otrosSi: '',
    otrosNo: ''
  };

  limit: number;

  strangeSensationSubscribe: any;

  constructor(
    private modalController: ModalController,
    private pareadaService: PareadaService,
    private datePipe: DatePipe
  ) {
   }

  ngOnInit() {
    this.getTotalJar();
    this.addScales();
    this.getSensation();
    this.getAceptation();
    this.getLimitPosition();
    this.answer.date = this.datePipe.transform(this.today, 'dd-MM-yyyy');
  }

  getTotalJar() {
    this.totalJAR = this.hedonicaTest.tipojar.length;

  }

  next() {
    this.visible = this.visible + 1;
    if (this.visible === 1) {
        this.count = 0;
    } else if (this.visible <= this.totalJAR) {
      this.count = this.count + 1;
    }
   }

   back() {
    this.visible = this.visible - 1;
    if (this.visible === 0) {
      this.count = 0;
  } else if (this.visible === this.totalJAR) {
    this.count = this.totalJAR - 1;
  } else {
    this.count = this.count - 1;
  }
  }

  addScales() {
    this.answer.hedonica = [];
    this.answer.tipoJar = [];


    this.hedonicaTest.tipojar.forEach(jar => {
      this.answer.tipoJar.push({attribute: jar.attribute, point: 0});
      this.answer.hedonica.push({attribute: jar.attribute, point: null});

    });
  }



  getSensation() {
    this.strangeSensationSubscribe = this.pareadaService.getStrangeSensation()
     .subscribe(sen => {
      this.answer.strange = [];
      sen.forEach( sensation => {

          sensation.options.forEach(option => {
            this.answer.strange.push({val: option, isChecked: false});

         });
       });
     });

   }

   getAceptation() {

      this.answer.corresponde = [];
      this.answer.noCorresponde = [];
      this.hedonicaTest.attributes.forEach( att => {

        this.answer.corresponde.push({val: att, isChecked: false});
        this.answer.noCorresponde.push({val: att, isChecked: false});
       });

   }

  close() {
    this.modalController.dismiss();
  }

  save() {
    this.modalController.dismiss();
  }



  async presentModal() {
    const modalPN = await this.modalController.create({
      component: HedonicaAcceptancePage,
      backdropDismiss: false,
      cssClass: 'positive-negative',
      componentProps: {
        left: this.hedonicaTest.tipojar[this.count].scales.jar2,
        rigth: this.hedonicaTest.tipojar[this.count].scales.jar4,
        selected: this.answer.tipoJar[this.count].point
      }
    });

    modalPN.onWillDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
          this.answer.tipoJar[this.count].point = dataReturned.data;
      }
    });

    return modalPN.present();

  }


  limiteEstablecido(index: number) {
     if (index <= this.limit) {
        this.presentModal();
     }
  }

  getLimitPosition() {
    const arreglo: string[] = this.hedonicaTest.hedonica[0].scales;
    this.limit = arreglo.indexOf(this.hedonicaTest.intensity);
  }
}
