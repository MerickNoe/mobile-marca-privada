import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-positive-negative',
  templateUrl: './positive-negative.page.html',
  styleUrls: ['./positive-negative.page.scss'],
})
export class PositiveNegativePage implements OnInit {

  @Input() selected;
  @Input() classSelected;
  @Input() optionSelected;
  @Input() sample1;
  @Input() sample2;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  dismiss(pn: number) {
    this.modalController.dismiss( pn );
  }

}
