import { Component, OnInit, Input } from '@angular/core';
import { HedonicaTest, HedonicaAnswer, StrangeModel } from '../../entities/hedonica.interface';
import { formatDate, DatePipe } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { PareadaService } from '../../services/pareada.service';
import { HedonicaAcceptancePage } from '../hedonica-acceptance/hedonica-acceptance.page';
import { HedonicaService } from '../../services/hedonica.service';
import { AlertController } from '@ionic/angular';

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
    otrosNo: '',
    otroStrange: ''
  };

  limit: number;

  strangeSensationSubscribe: any;

  buttons: boolean[];
  otrossample = false;
  flagSi = false;
  flagNo = false;

  disableCheck: boolean[];

  constructor(
    private modalController: ModalController,
    private pareadaService: PareadaService,
    private datePipe: DatePipe,
    private hedonicaService: HedonicaService,
    private alertController: AlertController
  ) {
   }

  ngOnInit() {
    this.getTotalJar();
    this.addScales();
    this.getSensation();
    this.getAceptation();
    this.getLimitPosition();
    this.disableNext();
    this.answer.test = this.hedonicaTest.id;
    this.answer.date = this.datePipe.transform(this.today, 'dd-MM-yyyy');
  }

  disableNext() {
    this.buttons = [];
    this.buttons.push(true);
    for (let i = 0; i <= this.totalJAR + 4; i++) {
        this.buttons.push(false);
    }

    this.buttons.push(true);
    this.buttons[this.totalJAR + 4] = true;
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
    if (this.strangeSensationSubscribe) { this.strangeSensationSubscribe.unsubscribe(); }
    this.strangeSensationSubscribe = this.pareadaService.getStrangeSensation()
     .subscribe(sen => {
      this.answer.strange = [];
      this.disableCheck = [];
      sen.forEach( sensation => {

          sensation.options.forEach(option => {
            this.answer.strange.push({val: option, isChecked: false});
            this.disableCheck.push(false);
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

  async save() {
    try {
      const res = await this.hedonicaService.addAnswer(this.answer);
      if (res) {
        this.presentAlert('Ha finalizado la encuesta exitosamente.');
       }
    } catch (error) {
      this.presentAlert('Error interno.');
     }

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
     this.buttons[this.visible] = true;
     if (index <= this.limit) {
        this.presentModal();
     } else {
      this.answer.tipoJar[this.count].point = 0;
     }
  }

  getLimitPosition() {
    const arreglo: string[] = this.hedonicaTest.hedonica[0].scales;
    this.limit = arreglo.indexOf(this.hedonicaTest.intensity);
  }


  strangeSampleClick(option: StrangeModel) {

    switch (option.val) {

      case 'Otros':
          this.answer.strange[8].isChecked = false;
          if (option.isChecked === true) {
            this.otrossample = true;
          } else {
            this.otrossample = false;
            this.answer.otroStrange = '';
          }
          break;
          default:
              this.answer.strange[8].isChecked = false;
              break;

    }

    this.checkStranges();

   }

   checkStranges() {
    let result = false;

    this.answer.strange.forEach(str => {
      if (!result) {
        if ( str.isChecked === true) {
            result = true;
      }  else {
        result = false;
      }
      }
    });

    if (this.otrossample) {
      if (this.answer.otroStrange.trim()) {
        result = true;
      } else {
        result = false;
      }
    }


    if (result) {
      this.buttons[this.visible] = true;
    } else {
      this.buttons[this.visible] = false;
    }
  }

  ningunoClick(option: StrangeModel) {

    if (option.isChecked === true) {
      this.answer.strange[0].isChecked = false;
      this.answer.strange[1].isChecked = false;
      this.answer.strange[2].isChecked = false;
      this.answer.strange[3].isChecked = false;
      this.answer.strange[4].isChecked = false;
      this.answer.strange[5].isChecked = false;
      this.answer.strange[6].isChecked = false;
      this.answer.strange[7].isChecked = false;
      this.answer.strange[9].isChecked = false;
    } else {
      this.answer.strange[8].isChecked = false;
    }

    this.checkStranges();

  }

  generalSelected() {
    this.buttons[this.visible] = true;
  }

  sampleSiClick(option: StrangeModel, index: number) {

    console.log(index);
    if (option.isChecked) {
      this.disableCheck[index] = true;
      this.answer.noCorresponde[index].isChecked = false;
    } else {
      this.disableCheck[index] = false;
    }

    this.sampleSiChecked();
    }

    sampleSiChecked() {
      let result = false;
      this.answer.corresponde.forEach(str => {
        if (!result) {
          if ( str.isChecked === true) {
              result = true;
        }  else {
          result = false;
        }
        }
      });

      if (result || this.answer.otrosSi.trim()) {
        this.buttons[this.visible] = true;
        this.flagSi = true;
      } else {
        this.buttons[this.visible] = false;
        this.flagSi = false;
      }
    }


    otrosSi() {
      if (this.answer.otrosSi.trim() || this.flagSi) {
        this.buttons[this.visible] = true;
      } else {
        this.buttons[this.visible] = false;
      }
    }

      ionViewWillLeave() {
        if (this.strangeSensationSubscribe) { this.strangeSensationSubscribe.unsubscribe(); }
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
