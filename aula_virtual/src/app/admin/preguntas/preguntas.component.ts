import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../../servicios/curso/curso.service';
import { Actividad, Pregunta } from '../../clases/curso';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

export interface Respuesta {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})


export class PreguntasComponent implements OnInit {
  private uid;
  private idCurso;
  actividad: Actividad;
  preguntaForm: FormGroup;
  respuestas: Respuesta[] = [
    { value: true, viewValue: 'Verdadero' },
    { value: false, viewValue: 'Falso' },
  ];
  constructor(
    private route: ActivatedRoute,
    private cursoService: CursoService,
    private fb: FormBuilder,

  ) {
    this.uid = this.route.snapshot.paramMap.get('uid');

  }

  ngOnInit() {
    this.cursoService.getActividad(this.uid).subscribe(actividad => {
      this.actividad = actividad
      this.idCurso = actividad.idCurso
    })
    this.preguntaForm = this.fb.group({
      preguntas: this.fb.array([])
    })
  }

  get preguntaForms() {
    return this.preguntaForm.get('preguntas') as FormArray
  }
  addPregunta() {

    const actividad = this.fb.group({
      pregunta: ['',Validators.required],
      respuesta: ['',Validators.required],
    })

    this.preguntaForms.push(actividad);
  }

  deletePregunta(i) {
    this.preguntaForms.removeAt(i)
  }
  addPreguntas(){
    let preguntas:Pregunta={
      preguntas:this.preguntaForm.value.preguntas
    }
    this.cursoService.addPreguntas(preguntas,this.uid,this.idCurso)
  }

}
