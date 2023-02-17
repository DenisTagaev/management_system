import { Injectable } from '@angular/core';
import { getFirestore, Firestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  db: Firestore;

  constructor() {
    this.db = getFirestore();
  }
}
