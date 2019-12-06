import { Component, OnInit, Input } from '@angular/core';
import { PareadaTest, CompareacionPareadaAnswer,
         TipoJar, NegativePositive, StrangeModel, OptionJar, StrangeSensation } from '../../entities/pareada.interface';
import { ModalController, AlertController } from '@ionic/angular';
import { Observable, Subscriber } from 'rxjs';
import { Instrucion } from '../../entities/intruction.interface';
import { IntructionService } from 'src/app/services/intruction.service';
import { ResColor } from '../../entities/pareada.interface';
import { PositiveNegativePage } from '../positive-negative/positive-negative.page';
import { PareadaService } from '../../services/pareada.service';
import {  DatePipe } from '@angular/common';

@Component({
  selector: 'app-pareada-answer',
  templateUrl: './pareada-answer.page.html',
  styleUrls: ['./pareada-answer.page.scss'],
})
export class PareadaAnswerPage implements OnInit {

  @Input() pareadaTest: PareadaTest;

  today = new Date();

  totalJAR = 0;
  visible = 0;
  count = 0;

  instructions: Observable<Instrucion[]>;

  answer: CompareacionPareadaAnswer = {
    test: '',
    name: '',
    date: '',
    semejante1: '',
    semejante2: '',
    semejante3: '',
    semejante4: '',
    diferencia1: '',
    diferencia2: '',
    diferencia3: '',
    diferencia4: '',
    generalSample1: null,
    generalSample2: null,
    otrosSample1: '',
    otrosSample2: '',
    tipoJar: [],
    negativePositive: [],
    strange1: [],
    strange2: [],
  };

  jars: TipoJar[];
  pn: NegativePositive[];

  strangeSensationSubscribe: any;
  otrossample1 = false;
  otrossample2 = false;


  optionSelected: OptionJar[] = [];
  resColor: ResColor[] = [];
  buttons: boolean[];

  gSelected1 = null;
  gSelected2 = null;

  constructor(
    private modalController: ModalController,
    private instructionService: IntructionService,
    private pareadaService: PareadaService,
    private datePipe: DatePipe
  ) {
   }

  ngOnInit() {
    this.getTotalJar();
    this.getInstructions();
    this.addJars();
    this.getSensation();
    this.answer.date = this.datePipe.transform(this.today, 'dd-MM-yyyy');
    this.answer.test = this.pareadaTest.id;
    this.disableNext();
  }

  close() {
    this.modalController.dismiss();
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

  getTotalJar() {
    this.totalJAR = this.pareadaTest.tipojar.length;

  }

  getInstructions() {
    this.instructions = this.instructionService.getInstruction('Comparación preada (Tipo Jar)');
  }

  addJars() {
    this.jars = [];
    this.pn = [];
    this.optionSelected = [];
    this.resColor = [];

    this.pareadaTest.tipojar.forEach(jar => {
      this.jars.push({attribute: jar.attribute, point: null});
      this.pn.push({attribute: jar.attribute, point: null});
      this.optionSelected.push({attribute: jar.attribute, selected: ''});
      this.resColor.push({attribute: jar.attribute, color: 'res'});
    });
  }




  showSelected(option: string, position: number) {
    this.optionSelected[this.count].selected = option;
    this.buttons[this.visible] = true;
    switch (position) {
      case 1: {
          this.resColor[this.count].color = 'res1';
          break;
        }
      case 2: {
          this.resColor[this.count].color = 'res2';
          break;
        }
      case 3: {
          this.resColor[this.count].color = 'res3';
          this.pn[this.count].point = null;
          break;
        }
      case 4: {
          this.resColor[this.count].color = 'res2';
          break;
        }
      case 5: {
          this.resColor[this.count].color = 'res1';
          break;
        }
      }

  }

  async presentModal(jar: string, clase: string, pn: number) {
    const modalPN = await this.modalController.create({
      component: PositiveNegativePage,
      backdropDismiss: false,
      cssClass: 'positive-negative',
      componentProps: {
        selected: jar,
        classSelected: clase,
        optionSelected: pn,
        sample1: this.pareadaTest.sample1,
        sample2: this.pareadaTest.sample2
      }
    });

    modalPN.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
          this.pn[this.count].point = dataReturned.data;
      }
    });

    return await modalPN.present();
  }

  openPositiveNegative(option: string, position: number) {
    switch (position) {
      case 1: {
          this.presentModal(option, 'res1', this.pn[this.count].point);
          break;
        }
      case 2: {
          this.presentModal(option, 'res2', this.pn[this.count].point);
          break;
        }

      case 4: {
          this.presentModal(option, 'res2', this.pn[this.count].point);
          break;
        }
      case 5: {
          this.presentModal(option, 'res1', this.pn[this.count].point);
          break;
        }
      }
  }


  getSensation() {
   this.strangeSensationSubscribe = this.pareadaService.getStrangeSensation()
    .subscribe(sen => {
      this.answer.strange1 = [];
      this.answer.strange2 = [];
      sen.forEach( sensation => {

         sensation.options.forEach(option => {
          this.answer.strange1.push({val: option, isChecked: false});
          this.answer.strange2.push({val: option, isChecked: false});
        });
      });
    });

  }

  ionViewWillLeave() {
    if (this.strangeSensationSubscribe) { this.strangeSensationSubscribe.unsubscribe(); }
 }

 strangeSample1Click(option: StrangeModel) {

  switch (option.val) {

    case 'Otros':
        this.answer.strange1[8].isChecked = false;
        if (option.isChecked === true) {
          this.otrossample1 = true;
        } else {
          this.otrossample1 = false;
          this.answer.otrosSample1 = '';
        }
        break;
        default:
            this.answer.strange1[8].isChecked = false;
            break;

  }

  this.checkStranges();

 }



 strangeSample2Click(option: StrangeModel) {

  switch (option.val) {
    case 'Otros':
        this.answer.strange2[8].isChecked = false;
        if (option.isChecked === true) {
          this.otrossample2 = true;
        } else {
          this.otrossample2 = false;
          this.answer.otrosSample2 = '';
        }
        break;
    default:
      this.answer.strange2[8].isChecked = false;
      break;
  }

  this.checkStranges();
 }

 async  save() {
  await this.createInterface();
  this.pareadaService.addAnswer(this.answer);
  this.modalController.dismiss();
  }

  createInterface() {
    this.answer.tipoJar = this.jars;
    this.answer.negativePositive = this.pn;
  }

 async disableNext() {
    this.buttons = [];
    await this.buttons.push(true);
    for (let i = 0; i <= this.totalJAR + 1; i++) {
        this.buttons.push(false);
    }

    this.buttons.push(true);


  }

  checkStranges() {
    let result1 = false;
    let result2 = false;
    this.answer.strange1.forEach(str1 => {
      if (!result1) {
        if ( str1.isChecked === true) {
            result1 = true;
      }  else {
        result1 = false;
      }
      }
    });

    if (this.otrossample1) {
      if (this.answer.otrosSample1.trim()) {
        result1 = true;
      } else {
        result1 = false;
      }
    }

    this.answer.strange2.forEach(str2 => {
      if (!result2) {
        if (str2.isChecked === true) {
            result2 = true;
       } else {
         result2 = false;
       }
      }

    });

    if (this.otrossample2) {
      if (this.answer.otrosSample2.trim()) {
        result2 = true;
      } else {
        result2 = false;
      }
    }

    if (result1 && result2) {
      this.buttons[this.visible] = true;
    } else {
      this.buttons[this.visible] = false;
    }
  }

  generalSelected1(g: number) {
    this.gSelected1 = g;
    this.generalSelected();

  }

  generalSelected2(g: number) {
    this.gSelected2 = 2;
    this.generalSelected();
  }


  generalSelected() {

    if (this.gSelected1 !== null && this.gSelected2 !== null) {
      this.buttons[this.visible] = true;
    } else {
      this.buttons[this.visible] = false;
    }
  }




  ninguno1(option: StrangeModel) {

    if (option.isChecked === true) {
      this.answer.strange1[0].isChecked = false;
      this.answer.strange1[1].isChecked = false;
      this.answer.strange1[2].isChecked = false;
      this.answer.strange1[3].isChecked = false;
      this.answer.strange1[4].isChecked = false;
      this.answer.strange1[5].isChecked = false;
      this.answer.strange1[6].isChecked = false;
      this.answer.strange1[7].isChecked = false;
      this.answer.strange1[9].isChecked = false;
    } else {
      this.answer.strange1[8].isChecked = false;
    }

    this.checkStranges();

  }

  ninguno2(option: StrangeModel) {
    if (option.isChecked === true) {
      this.answer.strange2[0].isChecked = false;
      this.answer.strange2[1].isChecked = false;
      this.answer.strange2[2].isChecked = false;
      this.answer.strange2[3].isChecked = false;
      this.answer.strange2[4].isChecked = false;
      this.answer.strange2[5].isChecked = false;
      this.answer.strange2[6].isChecked = false;
      this.answer.strange2[7].isChecked = false;
      this.answer.strange2[9].isChecked = false;
    } else {
      this.answer.strange2[8].isChecked = false;
    }

    this.checkStranges();
  }

}
