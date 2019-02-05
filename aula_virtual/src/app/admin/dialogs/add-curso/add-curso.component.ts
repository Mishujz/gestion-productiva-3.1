import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from '../../../clases/curso';
import { AuthService } from '../../../servicios/auth/auth.service';
import { MatDialogRef } from '@angular/material';
import { CursoService } from '../../../servicios/curso/curso.service';
@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.component.html',
  styleUrls: ['./add-curso.component.scss']
})
export class AddCursoComponent implements OnInit {
  curso: Curso;
  userUid: string;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cursoService: CursoService,
    public dialogRef: MatDialogRef<AddCursoComponent>,
  ) { }

  cursoForm = this.fb.group({
    nombre: ['', Validators.required],
    codigo: ['', Validators.required],
    fechaInicio: ['', Validators.required],
    fechaFin: ['', Validators.required],
  })

  ngOnInit() {
    this.authService.getAuth().subscribe(data => {
      this.userUid = data.uid
    })
  }
  addCurso() {
    let curso: Curso = {
      nombre: this.cursoForm.value.nombre,
      codigo: this.cursoForm.value.codigo,
      fechaInicio: this.cursoForm.value.fechaInicio,
      fechaFin: this.cursoForm.value.fechaFin,
      fechaCreacion: new Date(),
      idUsuario: this.userUid,
    }
    console.log(curso)
    this.cursoService.addCurso(curso);
    this.dialogRef.close();
  }
}
