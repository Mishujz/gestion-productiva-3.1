import { Component, OnInit, Inject } from '@angular/core';
import { TipoActividad, Actividad } from '../../../clases/curso';
import { Observable } from 'rxjs/Observable';
import { CursoService } from '../../../servicios/curso/curso.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOptionSelectionChange, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-actividad',
  templateUrl: './edit-actividad.component.html',
  styleUrls: ['./edit-actividad.component.scss']
})
export class EditActividadComponent implements OnInit {
  public idActividad;
  tipo_actividades: Observable<TipoActividad[]>;
  actividadForm: FormGroup;

  constructor(
    private cursoService: CursoService,
    private fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<EditActividadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idActividad = data.idActividad
  }

  ngOnInit() {
    this.cursoService.getActividad(this.idActividad).subscribe(actividad => {

      this.actividadForm = this.fb.group({
        nombre: [actividad.nombre, [Validators.required, Validators.minLength(4)]],
        // tipo: [actividad.tipo, Validators.required],
        descripcion: [actividad.descripcion, Validators.required],
        puntaje: [actividad.puntaje, Validators.required],
        fechaInicio: [actividad.fechaInicio, Validators.required],
        fechaFin: [actividad.fechaFin, Validators.required],
      })
    })
  }

}
