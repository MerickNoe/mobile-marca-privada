import { Component, OnInit, Input } from '@angular/core';
import { JarMixTest, JarMixAnswer, TipoJar } from 'src/app/entities/jarmix.interface';
import { Instrucion } from 'src/app/entities/intruction.interface';
import { Router } from '@angular/router';
import { JarmixService } from 'src/app/services/jarmix.service';
import { ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { IntructionService } from '../../services/intruction.service';
import { Observable } from 'rxjs';

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
  now = '';


  instructions: Observable<Instrucion[]>;


  jars: TipoJar[];

  buttons: boolean[];

  constructor(
    private router: Router,
    private jarmixService: JarmixService,
    private modalController: ModalController,
    private instructionService: IntructionService
  ) {
    this.now = formatDate(this.today, 'dd-MM-yyyy', 'en-US');
   }



  ngOnInit() {
    this.getTotalJar();
    this.answer.date = this.now;
    this.answer.test = this.jarMixTest.id;
    this.getInstructions();
    this.addJars();
    this.disableNext();
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
    await this.createInterface();
    this.jarmixService.addAnswer(this.answer);
    this.modalController.dismiss();
  }

  createInterface() {
    this.answer.jars = this.jars;
  }

  async disableNext() {
    this.buttons = [];
    await this.buttons.push(true);
    for (let i = 0; i <= this.totalJAR + 4; i++) {
        this.buttons.push(false);
    }

    this.buttons.push(true);


  }

  generalSelected() {
    this.buttons[this.visible] = true;
  }

  jarSelected() {
    this.buttons[this.visible] = true;
  }

  validInput() {
    if ((this.answer.desagrado1.trim() ||
        this.answer.desagrado2.trim() ||
        this.answer.desagrado3.trim() ||
        this.answer.desagrado4.trim()) &&
        (this.answer.agrado1.trim() ||
        this.answer.agrado2.trim() ||
        this.answer.agrado3.trim() ||
        this.answer.agrado4.trim())) {
          this.buttons[this.visible] = true;
        } else {
          this.buttons[this.visible] = false;
        }
  }

  buySelected() {
    this.buttons[this.visible] = true;
  }

  consumerSelected() {
    this.buttons[this.visible] = true;
  }

}
