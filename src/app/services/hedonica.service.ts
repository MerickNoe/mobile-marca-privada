import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { HedonicaTest } from '../entities/hedonica.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HedonicaService {

  private testCollection: AngularFirestoreCollection<HedonicaTest>;

  constructor(
    private db: AngularFirestore
  ) {
    this.testCollection = this.db.collection<HedonicaTest>('hedonicatest');
   }


   getActiveTest(): Observable<HedonicaTest[]> {
    return this.db.collection<HedonicaTest>('hedonicatest', ref =>
    ref.where('active', '==', true))
    .snapshotChanges().pipe(
      map(actions => {
        return actions.map(obj => {
          const data  = obj.payload.doc.data();
          const id = obj.payload.doc.id;
          return { id, ...data };
        });
      })
    );
   }


}
