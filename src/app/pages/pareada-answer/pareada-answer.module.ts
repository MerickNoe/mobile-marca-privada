import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PareadaAnswerPage } from './pareada-answer.page';

const routes: Routes = [
  {
    path: '',
    component: PareadaAnswerPage
  }
];

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PareadaAnswerPage],

})
export class PareadaAnswerPageModule {}
