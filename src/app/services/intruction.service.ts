import { Injectable } from '@angular/core';
import { Instrucion } from '../entities/intruction.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class IntructionService {

  constructor(
    private db: AngularFirestore
  ) { }


  getInstruction(test: string): Observable<Instrucion[]> {
    return this.db.collection<Instrucion>('instruction', ref =>
    ref.where('test', '==', test))
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
