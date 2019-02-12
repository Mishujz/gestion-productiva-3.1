import { Component, OnInit, Inject } from '@angular/core';
import { TipoActividad, Actividad, Pregunta, Respuesta } from '../../../clases/curso';
import { Observable } from 'rxjs/Observable';
import { CursoService } from '../../../servicios/curso/curso.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatOptionSelectionChange, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface Respuesta {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-actividad-estudiante',
  templateUrl: './actividad-estudiante.component.html',
  styleUrls: ['./actividad-estudiante.component.scss']
})
export class ActividadEstudianteComponent implements OnInit {
  public idActividad;
  public idUsuario;
  tipo_actividades: Observable<TipoActividad[]>;
  respuestaForm: FormGroup;
  actividad: Actividad
  respuesta: Respuesta
  // respuestas: Respuesta[] = [
  //   { value: true, viewValue: 'Verdadero' },
  //   { value: false, viewValue: 'Falso' },
  // ];

  constructor(
    private cursoService: CursoService,
    private fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<ActividadEstudianteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idActividad = data.idActividad
    this.idUsuario = data.idUsuario

  }
  ngOnInit() {
    // this.preguntaForm = this.fb.group({
    //   preguntas: this.fb.array([])
    // })
    this.respuestaForm = this.fb.group({
    respuesta: ['', Validators.required],
  })
    this.cursoService.getRespuesta(this.idActividad).subscribe(respuesta => {
      this.respuestaForm.get('respuesta').setValue(respuesta.respuesta)
    })

  }

  addRespuesta() {
    const res: Respuesta = {
      respuesta: this.respuestaForm.value.respuesta,
      fecha: new Date(),
      idActividad: this.idActividad,
      idUsuario: this.idUsuario,
    }

    // this.cursoService.addRespuesta(res)
    this.dialogRef.close();
  }
}
