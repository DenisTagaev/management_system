import { Injectable } from '@angular/core';
// import { CollectionReference } from '@angular/fire/compat/firestore';
import { getFirestore,
    Firestore, 
    collection, 
    addDoc,
    getDocs,
    deleteDoc, 
    CollectionReference,
    QuerySnapshot,
    DocumentData,
    doc} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private _db: Firestore;
  private _studReference: CollectionReference;
  afsData: Array<unknown> = [];

  constructor() {
    this._db = getFirestore();
    this._studReference = collection(this._db, 'students');
  }

  async getAfsResult(){
    await this.retrieveStudents();
    return this.afsData;
  }

  async addStudent(student: unknown) {
    // const dbInstance = collection(this._db, 'students');
    await addDoc(this._studReference, student)
      .then(() => alert('Student added successfully'))
      .catch(err => alert(err.message));
  }

  async retrieveStudents(){
    this.afsData = [];

    await getDocs(this._studReference)
      .then((res:QuerySnapshot<DocumentData>) => {
        (res.docs.map(doc => {
          const newStud = ({...doc.data(), id: doc.id});
          // console.log(prod);
          this.afsData.push(newStud);
        }));
    });
  }
  
  async deleteStudent(id: string) {
    await deleteDoc(doc(this._studReference, id ))
      .then(() => {
        alert('Student Successfully deleted')
      })
      .catch(e => console.log(e));
  }
}
