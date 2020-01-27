import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DuotrioAnswerPage } from './duotrio-answer.page';

const routes: Routes = [
  {
    path: '',
    component: DuotrioAnswerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DuotrioAnswerPage]
})
export class DuotrioAnswerPageModule {}
