import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ChildrenTest, ChildrenAnswer, ChildrenAnswerMix } from '../entities/children.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {

  private answerCollection: AngularFirestoreCollection<ChildrenAnswer>;
  private answerMixCollection: AngularFirestoreCollection<ChildrenAnswerMix>;

  constructor(
    private db: AngularFirestore
  ) {
    this.answerCollection = this.db.collection<ChildrenAnswer>('childrenanswer');
    this.answerMixCollection = this.db.collection<ChildrenAnswerMix>('childrenanswermix');
   }

   getActiveTest(): Observable<ChildrenTest[]> {
    return this.db.collection<ChildrenTest>('childrentest', ref =>
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

   create(test: ChildrenAnswer) {
    return this.answerCollection.add(test);

   }

   createMix(anwer: ChildrenAnswerMix) {
    return this.answerMixCollection.add(anwer);

  }
}
