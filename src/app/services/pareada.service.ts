import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PareadaTest, StrangeSensation, CompareacionPareadaAnswer } from '../entities/pareada.interface';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PareadaService {

  private testCollection: AngularFirestoreCollection<PareadaTest>;
  private strangeCollection: AngularFirestoreCollection<StrangeSensation>;
  private pareadaAnswer: AngularFirestoreCollection<CompareacionPareadaAnswer>;

  constructor(
    private db: AngularFirestore
  ) {
      this.testCollection = this.db.collection<PareadaTest>('pareadatest');
      this.strangeCollection = this.db.collection<StrangeSensation>('strangetasteorsensation');
      this.pareadaAnswer = this.db.collection<CompareacionPareadaAnswer>('pareadaanswer');
  }

  getActiveTest(): Observable<PareadaTest[]> {
    return this.db.collection<PareadaTest>('pareadatest', ref =>
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

   getStrangeSensation(): Observable<StrangeSensation[]> {
    return this.strangeCollection.snapshotChanges().pipe(
     map(actions => {
       return actions.map(obj => {
         const data  = obj.payload.doc.data();
         const id = obj.payload.doc.id;
         return { id, ...data };
       });
     })
   );
  }

  addAnswer( answer: CompareacionPareadaAnswer) {
    this.pareadaAnswer.add(answer);
  }

}
