import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ChildrenTest, ChildrenAnswer } from '../entities/children.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {

  private answerCollection: AngularFirestoreCollection<ChildrenAnswer>;

  constructor(
    private db: AngularFirestore
  ) {
    this.answerCollection = this.db.collection<ChildrenAnswer>('childrenanswer');
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
     this.answerCollection.add(test);

   }
}
