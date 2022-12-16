import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { user } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData!: firebase.default.User;

  constructor(private authService: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) { 
      this.authService.authState.subscribe((user) => {
        if(user){
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          this.router.navigate(['/dashboard']);
        } else localStorage.setItem('user', 'null');
      })
  }
  setUserData(user: firebase.default.User) {
    const userRef : AngularFirestoreDocument<any> = 
      this.firestore.doc(`users/${user.uid}`);
    
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
    this.authService.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user!);
        this.authService.authState.subscribe((user) => {
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
    this.authService.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        alert('User registered!');
        this.setUserData(result.user!);
        // this.router.navigate(['/login']);
      }, err => {
          alert(err.message);
          this.router.navigate(['/signup']);
      })
      .catch(err => console.log(err));
  }
  //sign out
  signOut() {
    this.authService.signOut()
      .then(() => {
        alert('You have signed out!');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      }, err => {
        alert(err.message);
      })
      .catch(err => console.log(err));
  }
  //restorePassword
  restorePassword(email: string) {
    this.authService.sendPasswordResetEmail(email)
      .then(() => {
        alert('Restore Letter has been send');
        this.router.navigate(['/login']);
      },
        err => alert(err.message))
      .catch(err=>console.log(err));
  }
}
