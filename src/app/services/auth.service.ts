import { Injectable, OnDestroy } from '@angular/core';
import {
  Auth,
  Unsubscribe,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { collection, addDoc } from 'firebase/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setUser, unsetUser } from '../components/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private store: Store<AppState>
  ) {}

  userUnsubs!: Unsubscribe;
  async createUser(name: string, email: string, password: string) {
    const user = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const newUser = new User(user.user.uid, name, email);
    const ref = collection(this.firestore, 'users');
    return addDoc(ref, { ...newUser });
  }

  initAuthListener() {
    this.userUnsubs = this.auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName, email } = user;
        const newUser = new User(uid, displayName as string, email as string);
        this.store.dispatch(setUser({ user: newUser }));
      } else {
        this.store.dispatch(unsetUser())
        this.userUnsubs();
      }
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

  ngOnDestroy(): void {
    this.userUnsubs();
  }
}
