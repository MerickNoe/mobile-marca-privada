import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { DuoTrioTest, DuoTrioAnswer } from '../entities/duotrio.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DuotrioService {

  private testCollection: AngularFirestoreCollection<DuoTrioTest>;
  private answerCollection: AngularFirestoreCollection<DuoTrioAnswer>;

  constructor(
    private db: AngularFirestore
  ) {
    this.testCollection = this.db.collection<DuoTrioTest>('duotriotest');
    this.answerCollection =  this.db.collection<DuoTrioAnswer>('duotrioanswer');
   }

   getActiveTest(): Observable<DuoTrioTest[]> {
    return this.db.collection<DuoTrioTest>('duotriotest', ref =>
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

   create(test: DuoTrioAnswer) {
      this.answerCollection.add(test);
   }
}
