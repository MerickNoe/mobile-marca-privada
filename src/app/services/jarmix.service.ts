import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { JarMixTest, JarMixAnswer } from '../entities/jarmix.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JarmixService {

  private testCollection: AngularFirestoreCollection<JarMixTest>;
  private answerCollection: AngularFirestoreCollection<JarMixAnswer>;

  constructor(
    private db: AngularFirestore
  ) {
    this.testCollection = this.db.collection<JarMixTest>('jarmixtest');
    this.answerCollection = this.db.collection<JarMixAnswer>('jarmixanswer');
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

    this.answerCollection.add(answer);
  }
}
