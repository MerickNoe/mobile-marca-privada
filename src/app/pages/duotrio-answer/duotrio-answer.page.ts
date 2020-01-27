import { Component, OnInit, Input } from '@angular/core';
import { DuoTrioTest, DiferenciaModel } from 'src/app/entities/duotrio.interface';
import { ModalController } from '@ionic/angular';
import {  DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Instrucion } from 'src/app/entities/intruction.interface';
import { IntructionService } from 'src/app/services/intruction.service';
import { DuoTrioAnswer } from '../../entities/duotrio.interface';
import { DuotrioService } from '../../services/duotrio.service';

@Component({
  selector: 'app-duotrio-answer',
  templateUrl: './duotrio-answer.page.html',
  styleUrls: ['./duotrio-answer.page.scss'],
})
export class DuotrioAnswerPage implements OnInit {

  @Input() duotrioTest: DuoTrioTest;

  today = new Date();

  instructions: Observable<Instrucion[]>;

  answer: DuoTrioAnswer = {
    test: '',
    date: '',
    name: '',
    sample1Selected: '',
    sample2Selected: '',
    diferencias1: [],
    diferencias2: [],
    otro1: '',
    otro2: '',
    R1: '',
    R2: '',
  };

  otros1 = false;
  otros2 = false;

  visible = 0;
  buttons = [true, false, false, false, false, true];

  constructor(
    private modalController: ModalController,
    private instructionService: IntructionService,
    private duotrioService: DuotrioService,
    private datePipe: DatePipe
  ) {
   }

  ngOnInit() {
    this.getInstructions();
    this.getScales();
    this.answer.date = this.datePipe.transform(this.today, 'dd-MM-yyyy');
    this.answer.test = this.duotrioTest.id;
    this.answer.R1 = this.duotrioTest.set1.R;
    this.answer.R2 = this.duotrioTest.set2.R;
  }

  close() {
    this.modalController.dismiss();
  }

  getInstructions() {
    this.instructions = this.instructionService.getInstruction('Power Dúo Trío*');
  }

  getScales() {

       this.answer.diferencias1 = [];
       this.answer.diferencias2 = [];

       this.duotrioTest.scales.forEach( option => {

           this.answer.diferencias1.push({val: option, isChecked: false});
           this.answer.diferencias2.push({val: option, isChecked: false});

         });



       this.answer.diferencias1.push({val: 'Otro', isChecked: false});
       this.answer.diferencias2.push({val: 'Otro', isChecked: false});
   }

   diferencias1Click(option: DiferenciaModel) {

    if (option.val === 'Otro') {
      if (option.isChecked === true) {
        this.otros1 = true;
      } else {
        this.otros1 = false;
        this.answer.otro1 = '';
      }
    }

    this.checkDiferencias1();
   }

   save() {
    this.duotrioService.create(this.answer);
    this.modalController.dismiss();

   }

   next() {
    this.visible = this.visible + 1;
   }


   back() {
    this.visible = this.visible - 1;
  }

  enableNext() {
    this.buttons[this.visible] = true;
  }

  set1Select() {
    this.enableNext();
  }

  set2Select() {
    this.enableNext();
  }

  checkDiferencias1() {
    let result = false;
    this.answer.diferencias1.forEach(str1 => {
      if (!result) {
        if ( str1.isChecked === true) {
          result = true;
      }  else {
        result = false;
      }
      }
    });

    if (result && (this.otros1 === true) && this.answer.otro1.trim()) {
      this.buttons[this.visible] = true;
    } else if (result && (this.otros1 === false)) {
      this.buttons[this.visible] = true;
    } else {
      this.buttons[this.visible] = false;
    }
  }

  checkDiferencias2() {
    let result = false;
    this.answer.diferencias2.forEach(str1 => {
      if (!result) {
        if ( str1.isChecked === true) {
          result = true;
      }  else {
        result = false;
      }
      }
    });

    if (result && (this.otros1 === true) && this.answer.otro2.trim()) {
      this.buttons[this.visible] = true;
    } else if (result && (this.otros2 === false)) {
      this.buttons[this.visible] = true;
    } else {
      this.buttons[this.visible] = false;
    }
  }

  diferencias2Click(option: DiferenciaModel) {

    if (option.val === 'Otro') {
      if (option.isChecked === true) {
        this.otros2 = true;
      } else {
        this.otros2 = false;
        this.answer.otro1 = '';
      }
    }

    this.checkDiferencias2();
   }

}
