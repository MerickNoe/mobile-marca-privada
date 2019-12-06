import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { DODTest, DODAnswer } from '../entities/dod.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DodService {

  private testCollection: AngularFirestoreCollection<DODTest>;
  private dodAnswer: AngularFirestoreCollection<DODAnswer>;

  constructor(
    private db: AngularFirestore
  ) {
    this.testCollection = this.db.collection<DODTest>('dodtest');
    this.dodAnswer = this.db.collection<DODAnswer>('dodanswer');

   }

   getActiveTest(): Observable<DODTest[]> {
    return this.db.collection<DODTest>('dodtest', ref =>
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

   create(test: DODAnswer) {
    this.dodAnswer.add(test);
   }
}
