import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { JarMixTest, JarMixAnswer, JarMix2Answer } from '../entities/jarmix.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JarmixService {

  private testCollection: AngularFirestoreCollection<JarMixTest>;
  private answerCollection: AngularFirestoreCollection<JarMixAnswer>;
  private answerMix2Collection: AngularFirestoreCollection<JarMix2Answer>;

  constructor(
    private db: AngularFirestore
  ) {
    this.testCollection = this.db.collection<JarMixTest>('jarmixtest');
    this.answerCollection = this.db.collection<JarMixAnswer>('jarmixanswer');
    this.answerMix2Collection = this.db.collection<JarMix2Answer>('jarmix2answer');
   }

   getAllActives(): Observable<JarMixTest[]> {
    return this.db.collection<JarMixTest>('jarmixtest', ref =>
    ref.where('active', '==', true)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(obj => {
          const data  = obj.payload.doc.data();
          const id = obj.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  addAnswer(answer: JarMixAnswer) {

   return this.answerCollection.add(answer);
  }

  addAnswerMix2(answer: JarMix2Answer) {

   return this.answerMix2Collection.add(answer);
  }
}
