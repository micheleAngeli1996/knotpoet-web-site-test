import {inject, Injectable} from '@angular/core';
import {collection, collectionData, doc, docData, Firestore, DocumentData} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {WithFieldValue, FirestoreDataConverter} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore = inject(Firestore);

  getCollection<T extends WithFieldValue<DocumentData>>(collectionName: string): Observable<T[]> {
    return collectionData<T>(collection(this.firestore, collectionName).withConverter(this.createConverter<T>()), {idField: 'id'});
  }

  getDocById<T extends WithFieldValue<DocumentData>>(collectionName: string, id: string) {
    const ref = doc(this.firestore, collectionName, id).withConverter(this.createConverter<T>());
    return docData<T>(ref, {idField: 'id'});
  }

  createConverter<T>(): FirestoreDataConverter<T> {
    return {
      toFirestore(model: WithFieldValue<T>): DocumentData {
        return model as DocumentData;
      },
      fromFirestore(snapshot: any): T {
        return snapshot.data() as T;
      },
    };
  }
}
