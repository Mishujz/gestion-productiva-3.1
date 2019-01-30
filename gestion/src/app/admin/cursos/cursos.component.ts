import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCursoComponent } from '../dialogs/add-curso/add-curso.component';
import { Curso } from '../../clases/curso';
import { Observable } from 'rxjs/Observable';
import { CursoService } from '../../servicios/curso/curso.service';
import { AuthService } from '../../servicios/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  cursos: Observable<Curso[]>;
  uid: string
  constructor(
    public dialog: MatDialog,
    public cursoService: CursoService,
    public authService: AuthService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(data => {
      this.cursos = this.cursoService.getCursos(data.uid)
    })
  }

  addCurso(): void {
    const dialogRef = this.dialog.open(AddCursoComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  detalleCurso(uid) {
     this.router.navigate(['curso/'+uid]);
  }

}
