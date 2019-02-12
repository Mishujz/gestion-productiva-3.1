import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../servicios/curso/curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad, Pregunta, Respuesta } from '../../clases/curso';
import { Observable } from 'rxjs';
import { AuthService } from '../../servicios/auth/auth.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActividadEstudianteComponent } from '../dialogs/actividad-estudiante/actividad-estudiante.component';

@Component({
  selector: 'app-actividad-detalle',
  templateUrl: './actividad-detalle.component.html',
  styleUrls: ['./actividad-detalle.component.scss']
})
export class ActividadDetalleComponent implements OnInit {

  private uid;
  private idUsuario;
  actividad: Actividad
  pregunta: Pregunta
  respuestas: Respuesta[]
  respuestaForm: FormGroup;
  isUsuario: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cursoService: CursoService,
    private authService: AuthService,
    private fb: FormBuilder,
    public dialog: MatDialog,

  ) {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.authService.getAuth().subscribe(user => {
      this.idUsuario = user.uid
    })
    this.cursoService.getRespuestas(this.uid).subscribe(res => {
      res.forEach(respuesta => {
        this.authService.getUser(respuesta.idUsuario).subscribe(user => {
          respuesta.nomUsuario = `${user.nombres} ${user.apellidos}`
          respuesta.imagen = user.imagen
          if (respuesta.idUsuario == this.idUsuario) {
            respuesta.activo = true
          } else {
            respuesta.activo = false
          }
        })
      })
      this.respuestas = res
    })

  }

  ngOnInit() {
    this.cursoService.getActividad(this.uid).subscribe(actividad => {
      this.actividad = actividad
      this.cursoService.getPregunta(this.uid).subscribe(pregunta => {
        this.pregunta = pregunta

      })
    })
    this.respuestaForm = this.fb.group({
      respuesta: ['', Validators.required],
    })

  }
  addRespuesta() {
    const res: Respuesta = {
      respuesta: this.respuestaForm.value.respuesta,
      fecha: new Date(),
      idActividad: this.uid,
      idUsuario: this.idUsuario,
    }

    this.cursoService.addRespuesta(res)
          this.respuestaForm.get('respuesta').setValue('')
  }
  delete(respuesta) {

    console.log(respuesta.id)
    this.cursoService.deleteRespuesta(respuesta.id)
  }

  edit(uid) {
    console.log(uid)
    const dialogRef = this.dialog.open(ActividadEstudianteComponent, {
      data: {
        idActividad: uid,
        idUsuario: this.idUsuario
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  goToCurso(uid) {
    this.router.navigate(['/curso/' + uid])
  }

}
