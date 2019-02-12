import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Curso, Actividad, TipoActividad, Pregunta, UsuarioCurso, Respuesta } from '../../clases/curso';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  curso: Observable<Curso>;
  actividad: Observable<Actividad>;
  pregunta: Observable<any>;
  respuesta: Observable<Respuesta>;
  usuarioCurso: Observable<UsuarioCurso>;
  cursos: Observable<Curso[]>;
  actividades: Observable<Actividad[]>;
  preguntas: Observable<Pregunta[]>;
  respuestas: Observable<Respuesta[]>;
  usuarioCursos: Observable<UsuarioCurso[]>;
  tipo_actividades: Observable<TipoActividad[]>;

  private cursoCollection: AngularFirestoreCollection<Curso>;
  private preguntaCollection: AngularFirestoreCollection<Pregunta>;
  private respuestaCollection: AngularFirestoreCollection<Respuesta>;
  private usuarioCursoCollection: AngularFirestoreCollection<UsuarioCurso>;
  private actividadCollection: AngularFirestoreCollection<Actividad>;
  private tipoActividadCollection: AngularFirestoreCollection<TipoActividad>;
  private cursoDoc: AngularFirestoreDocument<Curso>;
  private usuarioCursoDoc: AngularFirestoreDocument<UsuarioCurso>;
  private actividadDoc: AngularFirestoreDocument<Actividad>;
  private preguntaDoc: AngularFirestoreDocument<any>;
  private respuestaDoc: AngularFirestoreDocument<Respuesta>;

  constructor(
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
  ) {

  }

  addCurso(curso: Curso) {
    const cursoCollection = this.afs.collection<Curso>('cursos');
    cursoCollection.add(curso).then(() => {
      this.toastr.success('Curso agregado correctamente!', 'Exito!');
    }).catch(err => this.toastr.error(err, 'Error'))

  }
  addRespuesta(respuesta: Respuesta) {
    const respuestaCollection = this.afs.collection<Respuesta>('respuestas');
    respuestaCollection.add(respuesta).then(() => {
      this.toastr.success('Respuesta agregada correctamente!', 'Exito!');
    }).catch(err => this.toastr.error(err, 'Error'))
  }

  addActividad(actividad: Actividad) {
    let tipo = actividad.tipo

    const actividadCollection = this.afs.collection<Actividad>('actividades');
    actividadCollection.add(actividad).then(actividad => {
      this.toastr.success('Actividad agregada correctamente!', 'Exito!');
      if (tipo == "3") {
        this.router.navigate(['/pregunta/' + actividad.id])
      }
    }).catch(err => this.toastr.error(err, 'Error'))
    actividadCollection.snapshotChanges().pipe(
      map(curso => {
        console.log(curso)
      }

      )
    )
  }
  updateActividad(uid, actividad: Actividad) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`actividades/${uid}`);
    userRef.set(actividad, { merge: true }).then(() => {
      this.toastr.success('Respuesta editada correctamente!', 'Exito!');
    }).catch(err => this.toastr.error(err, 'Error'))
  }

  getCursos(uid) {
    this.cursoCollection = this.afs.collection<Curso>('cursos', ref => ref.where('idUsuario', '==', uid));
    this.cursos = this.cursoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Curso;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.cursos;
  }
  getCountCursos(uid) {

    return this.afs.collection<Curso>('cursos', ref => ref.where('idUsuario', '==', uid)).get()


  }
  getRespuestas(uid) {

    this.respuestaCollection = this.afs.collection<Respuesta>('respuestas', ref => ref.where('idActividad', '==', uid));
    this.respuestas = this.respuestaCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Respuesta;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.respuestas;
  }
  getAllCursos() {
    this.cursoCollection = this.afs.collection<Curso>('cursos');
    this.cursos = this.cursoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Curso;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.cursos;
  }


  getActividades(uid) {
    this.actividadCollection = this.afs.collection<Actividad>('actividades', ref => ref.where('idCurso', '==', uid));
    this.actividades = this.actividadCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Actividad;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.actividades;
  }
  getUsuarioCurso(uid) {
    this.usuarioCursoCollection = this.afs.collection<UsuarioCurso>('usuario_curso', ref => ref.where('idUsuario', '==', uid));
    this.usuarioCursos = this.usuarioCursoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as UsuarioCurso;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.usuarioCursos;
  }
  getEstudiantes(uid) {
    this.usuarioCursoCollection = this.afs.collection<UsuarioCurso>('usuario_curso', ref => ref.where('idCurso', '==', uid));
    this.usuarioCursos = this.usuarioCursoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as UsuarioCurso;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.usuarioCursos;
  }
  addPreguntas(pregunta: Pregunta, uid, idCurso) {
    this.preguntaDoc = this.afs.doc<Pregunta>(`preguntas/${uid}`);
    this.preguntaDoc.set(pregunta).then(() => {
      this.router.navigate(['/curso/' + idCurso])
      this.toastr.success('Preguntas agregadas correctamente!', 'Exito!');
    }).catch(err => this.toastr.error(err, 'Error'))
  }
  addUsuarioCurso(curso: UsuarioCurso) {
    const cursoCollection = this.afs.collection<UsuarioCurso>('usuario_curso');
    cursoCollection.add(curso).then(() => {
      this.toastr.success('Curso agregado correctamente!', 'Exito!');
    }).catch(err => this.toastr.error(err, 'Error'))
  }

  getCurso(uid) {
    this.cursoDoc = this.afs.doc<Curso>(`cursos/${uid}`);
    return this.curso = this.cursoDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Curso;
        data.uid = action.payload.id;
        return data;
      }
    }));
  }
  getRespuesta(uid) {
    this.respuestaDoc = this.afs.doc<Respuesta>(`respuestas/${uid}`);
    return this.respuesta = this.respuestaDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Respuesta;
        data.uid = action.payload.id;
        return data;
      }
    }));
  }

  getPregunta(uid) {
    this.preguntaDoc = this.afs.doc<Pregunta>(`preguntas/${uid}`);
    return this.pregunta = this.preguntaDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Pregunta;
        data.uid = action.payload.id;
        return data;
      }
    }));
  }
  deleteRespuesta(uid) {
    this.respuestaDoc = this.afs.doc<Respuesta>(`respuestas/${uid}`)
    this.respuestaDoc.delete().then(() => {
      this.toastr.success('Respuesta eliminada correctamente!', 'Exito!');
    }).catch(err => this.toastr.error(err, 'Error'))

  }
  getActividad(uid) {
    this.actividadDoc = this.afs.doc<Actividad>(`actividades/${uid}`);
    return this.actividad = this.actividadDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Actividad;
        data.uid = action.payload.id;
        return data;
      }
    }));
  }
  deleteActividad(uid) {
    this.actividadDoc = this.afs.doc<Actividad>(`actividades/${uid}`)
    this.actividadDoc.delete().then(() => {
      this.toastr.success('Actividad eliminada correctamente!', 'Exito!');
    }).catch(err => this.toastr.error(err, 'Error'))

  }
  getTipoActividades() {
    this.tipoActividadCollection = this.afs.collection<TipoActividad>('tipo_actividad');
    this.tipo_actividades = this.tipoActividadCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as TipoActividad;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.tipo_actividades;
  }
}
