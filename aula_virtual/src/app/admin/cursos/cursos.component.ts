import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent } from '@angular/material';
import { AddCursoComponent } from '../dialogs/add-curso/add-curso.component';
import { Curso, UsuarioCurso } from '../../clases/curso';
import { Observable } from 'rxjs/Observable';
import { CursoService } from '../../servicios/curso/curso.service';
import { AuthService } from '../../servicios/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  cursos: Observable<Curso[]>;
  usuarioCursos: Observable<UsuarioCurso[]>;
  cursosAux: Curso[] = [];
  curso: UsuarioCurso
  uid: string
  uidUser: string
  isProfesor: boolean
  myControl = new FormControl();
  filteredCursos: Observable<Curso[]>;

  constructor(
    public dialog: MatDialog,
    public cursoService: CursoService,
    public authService: AuthService,
    public router: Router,
  ) {
    this.authService.getAuth().subscribe(data => {
      this.cursos = this.cursoService.getCursos(data.uid)
      this.authService.getUser(data.uid).subscribe(user => {
        this.uidUser = user.id
        if (user.rol == "1") {
          this.isProfesor = true
        } else {
          this.usuarioCursos = this.cursoService.getUsuarioCurso(this.uidUser)
          this.usuarioCursos.subscribe(cursos => {
            let contactsList = [];
            cursos.forEach(curso => {
              this.cursoService.getCurso(curso.idCurso).subscribe(res => {
                let curse = res
                contactsList.push(curse)
              })
            })
            this.cursos = of(contactsList)
          })
          this.isProfesor = false
        }
      })
    })
    this.cursoService.getAllCursos().subscribe(cursos => this.cursosAux = cursos)
    this.filteredCursos = this.myControl.valueChanges
      .pipe(
        startWith<string | Curso>(''),
        map(value => typeof value === 'string' ? value : value.codigo),
        map(codigo => codigo ? this.filter(codigo) : this.cursosAux.slice())
      );
  }

  ngOnInit() {

  }


  addCurso(): void {
    const dialogRef = this.dialog.open(AddCursoComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  detalleCurso(curso) {
    if (curso.id) {
      this.router.navigate(['curso/' + curso.id]);

    }else if(curso.uid){

      this.router.navigate(['curso/' + curso.uid]);
    }
  }
  filter(nombre: string): Curso[] {
    return this.cursosAux.filter(option =>
      option.nombre.toLowerCase().indexOf(nombre.toLowerCase()) === 0);
  }
  selectCurso(e: MatAutocompleteSelectedEvent) {
    let curso: UsuarioCurso = {
      idUsuario: this.uidUser,
      idCurso: e.option.value.id,
    }
    this.cursoService.addUsuarioCurso(curso)
  }
  displayFn(curso?: Curso): string | undefined {
    return curso ? curso.codigo : undefined
  }

}
