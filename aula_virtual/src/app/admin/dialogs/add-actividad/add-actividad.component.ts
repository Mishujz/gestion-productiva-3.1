import { Component, OnInit, Inject } from '@angular/core';
import { TipoActividad, Actividad } from '../../../clases/curso';
import { Observable } from 'rxjs/Observable';
import { CursoService } from '../../../servicios/curso/curso.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOptionSelectionChange, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-add-actividad',
  templateUrl: './add-actividad.component.html',
  styleUrls: ['./add-actividad.component.scss']
})
export class AddActividadComponent implements OnInit {
  public idCurso;
  tipo_actividades: Observable<TipoActividad[]>;
  actividadForm: FormGroup;

  constructor(
    private cursoService: CursoService,
    private fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<AddActividadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idCurso = data.idCurso
  }

  ngOnInit() {
    this.tipo_actividades = this.cursoService.getTipoActividades()
    this.actividadForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required],
      puntaje: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
    })
  }

  addActividad() {
    let actividad:Actividad={
      nombre:this.actividadForm.value.nombre,
      tipo:this.actividadForm.value.tipo,
      descripcion:this.actividadForm.value.descripcion,
      puntaje:this.actividadForm.value.puntaje,
      fechaInicio:this.actividadForm.value.fechaInicio,
      fechaFin:this.actividadForm.value.fechaFin,
      idCurso:this.idCurso,
    }
    this.cursoService.addActividad(actividad)
    this.dialogRef.close();
  }



  setActividad(event: MatOptionSelectionChange, id: any) {
    if (id == 1) {
      console.log('Foro')
    }
  }
}
