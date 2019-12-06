import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-hedonica-acceptance',
  templateUrl: './hedonica-acceptance.page.html',
  styleUrls: ['./hedonica-acceptance.page.scss'],
})
export class HedonicaAcceptancePage implements OnInit {

  @Input() left;
  @Input() rigth;
  @Input() selected;

  constructor(
    private modalController: ModalController
  ) {

   }

  ngOnInit() {

  }

  dismiss(pn: number) {
    this.modalController.dismiss( pn );
  }

}
