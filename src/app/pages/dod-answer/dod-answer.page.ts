import { Component, OnInit, Input } from '@angular/core';
import { DODTest, DODAnswer } from '../../entities/dod.interface';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Instrucion } from 'src/app/entities/intruction.interface';
import { IntructionService } from 'src/app/services/intruction.service';
import { DatePipe } from '@angular/common';
import { PositiveNegativeDODPage } from '../positive-negative-dod/positive-negative-dod.page';
import { DodService } from '../../services/dod.service';

@Component({
  selector: 'app-dod-answer',
  templateUrl: './dod-answer.page.html',
  styleUrls: ['./dod-answer.page.scss'],
})
export class DodAnswerPage implements OnInit {

  @Input() dodTest: DODTest;

  today = new Date();

  totalScales = 0;
  visible = 0;
  count = 0;

  answer: DODAnswer = {
    test: '',
    name: '',
    date: '',
    set1: {
      sampleActual1: '',
      sampleActual2: '',
      scales: [],
      negativePositive: [],
      general1: null,
      general2: null,
    },
    set2: {
      sampleActual: '',
      samplePropuesta1: '',
      scales: [],
      negativePositive: [],
      general1: null,
      general2: null,
    },
    set3: {
      sampleActual: '',
      samplePropuesta2: '',
      scales: [],
      negativePositive: [],
      general1: null,
      general2: null,
    },
    set4: {
      samplePropuesta1: '',
      samplePropuesta2: '',
      scales: [],
      negativePositive: [],
      general1: null,
      general2: null,
    },
  };

  instructions: Observable<Instrucion[]>;

  buttons: boolean[];

  gSelected1Set1 = null;
  gSelected2Set1 = null;

  gSelected1Set2 = null;
  gSelected2Set2 = null;

  gSelected1Set3 = null;
  gSelected2Set3 = null;

  gSelected1Set4 = null;
  gSelected2Set4 = null;

  constructor(
    private modalController: ModalController,
    private instructionService: IntructionService,
    private dodService: DodService,
    private datePipe: DatePipe
  ) {
   }

  ngOnInit() {
    this.disableNext();
    this.getTotalScales();
    this.getInstructions();
    this.getTotalScales();
    this.addScales();
    this.answer.date = this.datePipe.transform(this.today, 'dd-MM-yyyy');
    this.answer.test = this.dodTest.id;
    this.answer.set1.sampleActual1 = this.dodTest.set1.sampleActual1;
    this.answer.set1.sampleActual2 = this.dodTest.set1.sampleActual2;
    this.answer.set2.sampleActual = this.dodTest.set2.sampleActual;
    this.answer.set2.samplePropuesta1 = this.dodTest.set2.samplePropuesta1;
    this.answer.set3.sampleActual = this.dodTest.set3.sampleActual;
    this.answer.set3.samplePropuesta2 = this.dodTest.set3.samplePropuesta2;
    this.answer.set4.samplePropuesta1 = this.dodTest.set4.samplePropuesta1;
    this.answer.set4.samplePropuesta2 = this.dodTest.set4.samplePropuesta2;
  }

  disableNext() {
    this.buttons = [];
    const total = (((this.dodTest.set1.scales.length) * 4) + 5);
    for (let i = 0; i <= total + 1; i++) {
      this.buttons.push(false);
  }
    this.buttons[0] = true;
  }

  enableNext() {
    this.buttons[this.visible] = true;
  }

  generalSelected1set1() {
    this.gSelected1Set1 = 1;
    this.generalSelectedSet1();

  }

  generalSelected2set1() {
    this.gSelected2Set1 = 2;
    this.generalSelectedSet1();
  }

  generalSelectedSet1() {
    if (this.gSelected1Set1 !== null && this.gSelected2Set1 !== null) {
      this.enableNext();
    }
  }

  generalSelected1set2() {
    this.gSelected1Set2 = 1;
    this.generalSelectedSet2();

  }

  generalSelected2set2() {
    this.gSelected2Set2 = 2;
    this.generalSelectedSet2();
  }

  generalSelectedSet2() {
    if (this.gSelected1Set2 !== null && this.gSelected2Set2 !== null) {
      this.enableNext();
    }
  }

  generalSelected1set3() {
    this.gSelected1Set3 = 1;
    this.generalSelectedSet3();

  }

  generalSelected2set3() {
    this.gSelected2Set3 = 2;
    this.generalSelectedSet3();
  }

  generalSelectedSet3() {
    if (this.gSelected1Set3 !== null && this.gSelected2Set3 !== null) {
      this.enableNext();
    }
  }

  generalSelected1set4() {
    this.gSelected1Set4 = 1;
    this.generalSelectedSet4();

  }

  generalSelected2set4() {
    this.gSelected2Set4 = 2;
    this.generalSelectedSet4();
  }

  generalSelectedSet4() {
    if (this.gSelected1Set4 !== null && this.gSelected2Set4 !== null) {
      this.enableNext();
    }
  }

  close() {
    this.modalController.dismiss();
  }

  getInstructions() {
    this.instructions = this.instructionService.getInstruction('DOD');
  }

  getTotalScales() {
    this.totalScales = this.dodTest.set1.scales.length;
  }

  addScales() {
    this.answer.set1.scales = [];
    this.answer.set1.negativePositive = [];
    this.answer.set2.scales = [];
    this.answer.set2.negativePositive = [];
    this.answer.set3.scales = [];
    this.answer.set3.negativePositive = [];
    this.answer.set4.scales = [];
    this.answer.set4.negativePositive = [];

    this.dodTest.set1.scales.forEach(scale => {
      this.answer.set1.scales.push({attribute: scale.attribute, point: null});
      this.answer.set1.negativePositive.push({attribute: scale.attribute, point: null});
      this.answer.set2.scales.push({attribute: scale.attribute, point: null});
      this.answer.set2.negativePositive.push({attribute: scale.attribute, point: null});
      this.answer.set3.scales.push({attribute: scale.attribute, point: null});
      this.answer.set3.negativePositive.push({attribute: scale.attribute, point: null});
      this.answer.set4.scales.push({attribute: scale.attribute, point: null});
      this.answer.set4.negativePositive.push({attribute: scale.attribute, point: null});
    });
}

next() {
  this.visible = this.visible + 1;
  if (this.visible === 1) {
      this.count = 0;
  } else if (this.visible <= (this.totalScales + 1)) {
    this.count = this.count + 1;
  } else if (this.visible === (this.totalScales + 2)) {
    this.count = 0;
  } else if ( this.visible >= (this.totalScales + 2) && this.visible <= ((this.totalScales * 2) + 2 )) {
    this.count = this.count + 1;
  } else if ( this.visible === (this.totalScales * 2 ) + 3 ) {
    this.count = 0;
  } else if ( this.visible >= ((this.totalScales * 2 ) + 4 ) && this.visible <= ((this.totalScales * 3) + 3 )) {
    this.count = this.count + 1;
  } else if ( this.visible === (this.totalScales * 3 ) + 4 ) {
    this.count = 0;
  } else if ( this.visible >= ((this.totalScales * 3 ) + 5 ) && this.visible <= ((this.totalScales * 4) + 5 )) {
    this.count = this.count + 1;
  }

}

 back() {
  this.visible = this.visible - 1;
  if (this.visible === 0) {
    this.count = 0;
} else if (this.visible === this.totalScales ||
           this.visible === ((this.totalScales * 2) + 1) ||
           this.visible === ((this.totalScales * 3) + 2)) {
  this.count = this.totalScales - 1;
} else {
  this.count = this.count - 1;
}
}


save() {
  this.dodService.create(this.answer);
  this.modalController.dismiss();
}

async presentModalSet1(sample1: string, pn: number) {
  const modalPN = await this.modalController.create({
    component: PositiveNegativeDODPage,
    backdropDismiss: false,
    cssClass: 'positive-negatve',
    componentProps: {
      sample: sample1,
      optionSelected: pn
    }
  });

  modalPN.onDidDismiss().then((dataReturned) => {
    if (dataReturned !== null) {
      this.answer.set1.negativePositive[this.count].point = dataReturned.data;
    }
  });

  return await modalPN.present();
}

async presentModalSet2(sample1: string, pn: number) {
  const modalPN = await this.modalController.create({
    component: PositiveNegativeDODPage,
    backdropDismiss: false,
    cssClass: 'positive-negatve',
    componentProps: {
      sample: sample1,
      optionSelected: pn
    }
  });

  modalPN.onDidDismiss().then((dataReturned) => {
    if (dataReturned !== null) {
      this.answer.set2.negativePositive[this.count].point = dataReturned.data;
    }
  });

  return await modalPN.present();
}

async presentModalSet3(sample1: string, pn: number) {
  const modalPN = await this.modalController.create({
    component: PositiveNegativeDODPage,
    backdropDismiss: false,
    cssClass: 'positive-negatve',
    componentProps: {
      sample: sample1,
      optionSelected: pn
    }
  });

  modalPN.onDidDismiss().then((dataReturned) => {
    if (dataReturned !== null) {
      this.answer.set3.negativePositive[this.count].point = dataReturned.data;
    }
  });

  return await modalPN.present();
}

async presentModalSet4(sample1: string, pn: number) {
  const modalPN = await this.modalController.create({
    component: PositiveNegativeDODPage,
    backdropDismiss: false,
    cssClass: 'positive-negatve',
    componentProps: {
      sample: sample1,
      optionSelected: pn
    }
  });

  modalPN.onDidDismiss().then((dataReturned) => {
    if (dataReturned !== null) {
      this.answer.set4.negativePositive[this.count].point = dataReturned.data;
    }
  });

  return await modalPN.present();
}

openPositiveNegativeSet1() {

  this.presentModalSet1(this.dodTest.set1.sampleActual1, this.answer.set1.negativePositive[this.count].point);

}

openPositiveNegativeSet2() {

  this.presentModalSet2(this.dodTest.set2.sampleActual, this.answer.set2.negativePositive[this.count].point);

}
openPositiveNegativeSet3() {

  this.presentModalSet3(this.dodTest.set3.sampleActual, this.answer.set3.negativePositive[this.count].point);

}
openPositiveNegativeSet4() {

  this.presentModalSet4(this.dodTest.set4.samplePropuesta1, this.answer.set4.negativePositive[this.count].point);

}


}
