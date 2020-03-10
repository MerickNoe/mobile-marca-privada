import { Component, OnInit, Input } from '@angular/core';
import { JarMixTest, JarMixAnswer, TipoJar, JarMix2Answer } from 'src/app/entities/jarmix.interface';
import { Instrucion } from 'src/app/entities/intruction.interface';
import { Router } from '@angular/router';
import { JarmixService } from 'src/app/services/jarmix.service';
import { ModalController } from '@ionic/angular';
import {  DatePipe } from '@angular/common';
import { IntructionService } from '../../services/intruction.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-jarmix-answer',
  templateUrl: './jarmix-answer.page.html',
  styleUrls: ['./jarmix-answer.page.scss'],
})
export class JarmixAnswerPage implements OnInit {

  @Input() jarMixTest: JarMixTest;

  answer: JarMixAnswer = {
    test: '',
    name: '',
    date: '',
    generalSample: null,
    jars: [],
    agrado1: '',
    agrado2: '',
    agrado3: '',
    agrado4: '',
    desagrado1: '',
    desagrado2: '',
    desagrado3: '',
    desagrado4: '',
    comprar: null,
    consumir: null
  };

  totalJAR = 0;
  visible = 0;
  count = 0;
  today = new Date();


  instructions: Observable<Instrucion[]>;


  jars: TipoJar[];

  buttons: boolean[];

  typeJar = 0;

  answerMix2: JarMix2Answer = {
    test: '',
    name: '',
    date: '',
    generalSample1: null,
    generalSample2: null,
    jarsSample1: [],
    jarsSample2: [],
    agrado1Sample1: '',
    agrado2Sample1: '',
    agrado3Sample1: '',
    agrado4Sample1: '',
    desagrado1Sample1: '',
    desagrado2Sample1: '',
    desagrado3Sample1: '',
    desagrado4Sample1: '',
    comprarSample1: null,
    agrado1Sample2: '',
    agrado2Sample2: '',
    agrado3Sample2: '',
    agrado4Sample2: '',
    desagrado1Sample2: '',
    desagrado2Sample2: '',
    desagrado3Sample2: '',
    desagrado4Sample2: '',
    comprarSample2: null,
    consumir: null
  };

  constructor(
    private router: Router,
    private jarmixService: JarmixService,
    private modalController: ModalController,
    private instructionService: IntructionService,
    private datePipe: DatePipe,
    private alertController: AlertController
  ) {
   }



  ngOnInit() {
    this.getInstructions();
    this.getTotalJar();

    if (Number(this.jarMixTest.jarmix) === 1) {
      this.typeJar = 1;
      this.answer.date = this.datePipe.transform(this.today, 'dd-MM-yyyy');
      this.answer.test = this.jarMixTest.id;
      this.addJars();
      this.disableNext();
    } else {
      this.typeJar = 2;
      this.answerMix2.date = this.datePipe.transform(this.today, 'dd-MM-yyyy');
      this.answerMix2.test = this.jarMixTest.id;
      this.addJarsMix2();
      this.disableNextMix2();
    }

  }

  close() {
    this.modalController.dismiss();
  }

  getInstructions() {
    this.instructions = this.instructionService.getInstruction('JAR');
  }

  next() {
    this.visible = this.visible + 1;
    if (this.visible === 2) {
        this.count = 0;
    } else if (this.visible > 2 && this.visible <= (this.totalJAR + 1)) {
      this.count = this.count + 1;
    }
  }

  getTotalJar() {
    this.totalJAR = this.jarMixTest.jars.length;
  }

  back() {
    this.visible = this.visible - 1;
    if (this.visible === 2) {
      this.count = 0;
  } else if (this.visible === (this.totalJAR + 1)) {
    this.count = this.totalJAR - 1;
  } else {
    this.count = this.count - 1;
  }
  }

  addJars() {
    this.jars = [];
    this.jarMixTest.jars.forEach(jar => {
      this.jars.push({attribute: jar.attribute, point: null});
    });
  }

  async save() {
    try {
      await this.createInterface();
      const res = await  this.jarmixService.addAnswer(this.answer);
      if (res) {
        this.presentAlert('Ha finalizado la encuesta exitosamente.');
       }
    } catch (error) {
      this.presentAlert('Error interno.');
     }

  }

  createInterface() {
    this.answer.jars = this.jars;
  }

  disableNext() {
    this.buttons = [];
    this.buttons.push(true);
    for (let i = 0; i <= this.totalJAR + 4; i++) {
        this.buttons.push(false);
    }

    this.buttons.push(true);

    this.buttons[this.totalJAR + 2] = true;

  }

  generalSelected() {
    this.buttons[this.visible] = true;
  }

  jarSelected() {
    this.buttons[this.visible] = true;
  }


  buySelected() {
    this.buttons[this.visible] = true;
  }

  consumerSelected() {
    this.buttons[this.visible] = true;
  }

  nextMix2() {
    this.visible = this.visible + 1;
    if (this.visible === 2) {
      this.count = 0;
  }  else if (this.visible > 2 && this.visible <= (this.totalJAR + 1)) {
    this.count = this.count + 1;
  } else if (this.visible === (this.totalJAR + 5) ) {
    this.count = 0;
  } else if (this.visible > (this.totalJAR + 5) && this.visible <= (this.totalJAR + this.totalJAR + 4)) {
    this.count = this.count + 1;
  }

  }

  backMix2() {
    this.visible = this.visible - 1;
    if (this.visible === 2) {
      this.count = 0;
  } else if (this.visible === (this.totalJAR + 1)) {
    this.count = this.totalJAR - 1;
  } else if (this.visible === (this.totalJAR + this.totalJAR + 4)) {
    this.count = this.totalJAR - 1;
  } else {
    this.count = this.count - 1;
  }

  }

  addJarsMix2() {
    this.answerMix2.jarsSample1 = [];
    this.answerMix2.jarsSample2 = [];

    this.jarMixTest.jars.forEach(jar => {
      this.answerMix2.jarsSample1.push({attribute: jar.attribute, point: null});
      this.answerMix2.jarsSample2.push({attribute: jar.attribute, point: null});
    });
  }

  async saveMix2() {
    try {
      const res = await  this.jarmixService.addAnswerMix2(this.answerMix2);
      if (res) {
        this.presentAlert('Ha finalizado la encuesta exitosamente.');
       }
    } catch (error) {
      this.presentAlert('Error interno.');
     }
  }

  disableNextMix2() {
    this.buttons = [];
    this.buttons.push(true);
    this.buttons.push(false);
    for (let i = 0; i <= this.totalJAR - 1; i++) {
        this.buttons.push(false);
    }
    this.buttons.push(true);
    this.buttons.push(false);
    this.buttons.push(false);

    for (let i = 0; i <= this.totalJAR - 1; i++) {
      this.buttons.push(false);
  }

    this.buttons.push(true);
    this.buttons.push(false);
    this.buttons.push(false);
    this.buttons.push(false);


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
