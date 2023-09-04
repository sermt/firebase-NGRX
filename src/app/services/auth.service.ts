import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {  Firestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { collection, addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}
  async createUser(name: string, email: string, password: string) {
    const user = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const newUser = new User(user.user.uid, name, email);
    const ref = collection(this.firestore, 'users');
    return addDoc(ref, {'123': '123'} );
  }

  initAuthListener() {
    this.auth.onAuthStateChanged((user) => {
      console.log(user?.email);
      console.log(user?.uid);
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

  isAuth(): boolean {
    return Boolean(this.auth.currentUser);
  }
}
