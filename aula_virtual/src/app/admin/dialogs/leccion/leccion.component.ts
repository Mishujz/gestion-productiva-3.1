import { Component, OnInit, Inject } from '@angular/core';
import { Actividad, Pregunta } from '../../../clases/curso';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../../../servicios/curso/curso.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface Respuesta {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-leccion',
  templateUrl: './leccion.component.html',
  styleUrls: ['./leccion.component.scss']
})
export class LeccionComponent implements OnInit {
  private uid;
  actividad: Actividad;
  leccionForm: FormGroup;
  preguntas: any[]
  resultado: number = 0
  terminado: boolean = false
  respuestas: Respuesta[] = [
    { value: true, viewValue: 'Verdadero' },
    { value: false, viewValue: 'Falso' },
  ];
  longitud: number;
  constructor(
    private route: ActivatedRoute,
    private cursoService: CursoService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<LeccionComponent>,
  ) {
    this.uid = data.idActividad
  }

  ngOnInit() {
    this.leccionForm = this.fb.group({
      //crea formulario de tipo array
      preguntas: this.fb.array([])
    })
    this.cursoService.getPregunta(this.uid).subscribe(preguntas => {
      const preg = preguntas.preguntas
      preg.forEach(pregunta => {
        this.addPregunta(pregunta)
      })
      this.preguntas = preguntas.preguntas
    })

  }
  get leccionForms() {
    return this.leccionForm.get('preguntas') as FormArray
  }
  addPregunta(pregunta) {

    const actividad = this.fb.group({
      pregunta: [{ value: pregunta.pregunta, disabled: true }, Validators.required],
      respuesta: ['', Validators.required],
    })

    this.leccionForms.push(actividad);

  }

  deletePregunta(i) {
    this.leccionForms.removeAt(i)
  }

  //metodo que obtiene las preguntas de la leccion y las agrega al formulario array
  addPreguntas() {
    let preguntas: [] = this.leccionForm.value.preguntas
    let resultado = 0
    this.preguntas.forEach((pregunta, i) => {
      let a: any = preguntas[i]
      if (a.respuesta == pregunta.respuesta) {
        resultado++
      }
    })
    this.longitud = preguntas.length
    this.resultado = resultado
    this.terminado = true
  }
}
