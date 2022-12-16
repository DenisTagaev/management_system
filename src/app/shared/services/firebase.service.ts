import { Injectable } from '@angular/core';
import { getFirestore, collection, doc, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, SnapshotOptions, Firestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  db: Firestore;

  constructor() {
    this.db = getFirestore();
  }
}
