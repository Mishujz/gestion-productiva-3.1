import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
// import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserInterface,Rol } from '../../clases/usuario';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<UserInterface>;
  roles: Observable<Rol[]>;
  private rolCollection: AngularFirestoreCollection<Rol>;

  private userDoc: AngularFirestoreDocument<UserInterface>;
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
  ) {
  }

  loginCorreo(data) {
    return this.afAuth.auth.signInWithEmailAndPassword(data.correo, data.clave).then(value => {
      console.log('Acceso correto!');
      this.router.navigate(['/perfil']);
    })
      .catch(err => {
        console.log('Algo salio mal:', err.message);
      });
  }
  loginCorreoDialog(data) {
    return this.afAuth.auth.signInWithEmailAndPassword(data.correo, data.clave);
  }
  
  loginAnonimoDialog() {
    return this.afAuth.auth.signInAnonymously();
  }
  getUser(uid) {
    this.userDoc = this.afs.doc<UserInterface>(`users/${uid}`);
    return this.user = this.userDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as UserInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }
  getRoles() {
     this.rolCollection = this.afs.collection<Rol>('roles');
      this.roles = this.rolCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Rol;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.roles;
  }


  getAuth() {
    return this.afAuth.authState;
  }
  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }
  logout() {
    return this.afAuth.auth.signOut().then(() => {
      console.log('sign out')
      this.router.navigate(['/login']);
    });
  }
  registerUser(user) {
    let rol = user.rol
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.clave)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user,rol)
        }).catch(err => console.log(reject(err)))
    });
  }
  //rol del estudiante y profesor
  private updateUserData(user,rol) {
    console.log(user)
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      email: user.email,
      rol: rol
    }
    return userRef.set(data, { merge: true })
  }
  isUserAdmin(userUid) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }
  actualizarUsuario(user, uid) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    return userRef.set(user, { merge: true })
  }
  actualizarImagenUsuario(imagen, uid) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    return userRef.set({ imagen: imagen }, { merge: true })
  }
}
