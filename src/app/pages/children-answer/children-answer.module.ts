import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChildrenAnswerPage } from './children-answer.page';

const routes: Routes = [
  {
    path: '',
    component: ChildrenAnswerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChildrenAnswerPage]
})
export class ChildrenAnswerPageModule {}
