import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HedonicaAcceptancePage } from './hedonica-acceptance.page';

const routes: Routes = [
  {
    path: '',
    component: HedonicaAcceptancePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HedonicaAcceptancePage]
})
export class HedonicaAcceptancePageModule {}
