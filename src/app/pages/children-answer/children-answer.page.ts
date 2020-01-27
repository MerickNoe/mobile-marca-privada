import { Component, OnInit, Input } from '@angular/core';
import { ChildrenTest, ChildrenAnswer } from '../../entities/children.interface';
import { ModalController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { ChildrenService } from '../../services/children.service';

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

  constructor(
    private modalController: ModalController,
    private childrenService: ChildrenService,
    private datePipe: DatePipe
  ) {
   }

  ngOnInit() {
    this.answer.date = this.datePipe.transform(this.today, 'dd-MM-yyyy');
    this.answer.test = this.childrenTest.id;
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

  save() {
    this.childrenService.create(this.answer);
    this.modalController.dismiss();
  }

  enableNext() {
    this.buttons[this.visible] = true;
  }
}
