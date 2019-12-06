import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PareadaAnswerPageModule } from './pages/pareada-answer/pareada-answer.module';
import { PositiveNegativePageModule } from './pages/positive-negative/positive-negative.module';
import { JarmixAnswerPageModule } from './pages/jarmix-answer/jarmix-answer.module';
import { HedonicaAnswerPageModule } from './pages/hedonica-answer/hedonica-answer.module';
import { HedonicaAcceptancePageModule } from './pages/hedonica-acceptance/hedonica-acceptance.module';
import { DodAnswerPageModule } from './pages/dod-answer/dod-answer.module';
import { PositiveNegativeDODPageModule } from './pages/positive-negative-dod/positive-negative-dod.module';
import { DuotrioAnswerPageModule } from './pages/duotrio-answer/duotrio-answer.module';
import { ChildrenAnswerPageModule } from './pages/children-answer/children-answer.module';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    PareadaAnswerPageModule,
    PositiveNegativePageModule,
    JarmixAnswerPageModule,
    HedonicaAnswerPageModule,
    HedonicaAcceptancePageModule,
    DodAnswerPageModule,
    PositiveNegativeDODPageModule,
    DuotrioAnswerPageModule,
    ChildrenAnswerPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
