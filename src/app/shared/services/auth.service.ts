import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { user } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
// import { getFirestore, doc, getDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData!: firebase.default.User;
  // user: object = {role: '', uid: '', email: ''};

  constructor(private _authService: AngularFireAuth,
    private _firestore: AngularFirestore,
    private router: Router) { 
      this._authService.authState.subscribe((user) => {
        if(user){
          this.userData = user;
          user.email === "admin@mail.com" ? localStorage.setItem('privileged', '1') : false;
          localStorage.setItem('user', JSON.stringify(this.userData));
          this.router.navigate(['/dashboard']);
        } else localStorage.setItem('user', 'null');
      })
  }

  setUserData(user: firebase.default.User) {
    const userRef : AngularFirestoreDocument<any> = 
      this._firestore.doc(`users/${user.uid}`);
    
    const User: User = {
      uid: user.uid,
      email: user.email!
    }
    return userRef.set(User, {merge: false});
  }

  get isLoggedIn(): boolean {
    const user: string | null = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  //firebase login 
  login(email: string, password: string) {
    this._authService.signInWithEmailAndPassword(email, password)
      .then(async(result) => {

        this.setUserData(result.user!);
        result.user?.email === "admin@mail.com" ? localStorage.setItem('privileged', '1') : false;

        this._authService.authState.subscribe((user) => {
          user ? this.router.navigate(['/dashboard']) :
          this.router.navigate(['/login']);
        })
      }, err => {
          alert(err.message);
          this.router.navigate(['/login']);
        }
      )
      .catch((err)=> console.log(err));
  }
  //firebase register
  register(email: string, password: string) {
    this._authService.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        alert('User registered!');       
        this.setUserData(result.user!);
        // this.router.navigate(['/login']);
      }, err => {
          alert(err.message);
          this.router.navigate(['/signup']);
      })
      .catch(err => console.log(err));
    
    // this._firestore.collection("users").get()
  }
  //sign out
  signOut() {
    this._authService.signOut()
      .then(() => {
        alert('You have signed out!');
        localStorage.removeItem('user');
        localStorage.removeItem('privileged');
        this.router.navigate(['/login']);
      }, err => {
        alert(err.message);
      })
      .catch(err => console.log(err));
  }
  //restorePassword
  restorePassword(email: string) {
    this._authService.sendPasswordResetEmail(email)
      .then(() => {
        alert('Restore Letter has been send');
        this.router.navigate(['/login']);
      },
        err => alert(err.message))
      .catch(err=>console.log(err));
  }
}
