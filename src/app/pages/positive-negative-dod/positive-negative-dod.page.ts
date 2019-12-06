import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-positive-negative-dod',
  templateUrl: './positive-negative-dod.page.html',
  styleUrls: ['./positive-negative-dod.page.scss'],
})
export class PositiveNegativeDODPage implements OnInit {

  @Input() sample;
  @Input() optionSelected;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {

  }

  dismiss(pn: number) {
    this.modalController.dismiss( pn );
  }

}
