import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { Curso, TipoActividad, Actividad } from '../../clases/curso';
import { CursoService } from '../../servicios/curso/curso.service';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort } from '@angular/material';
import { AddActividadComponent } from '../dialogs/add-actividad/add-actividad.component';
import { EditActividadComponent } from '../dialogs/edit-actividad/edit-actividad.component';
import { ActividadEstudianteComponent } from '../dialogs/actividad-estudiante/actividad-estudiante.component';
import { AuthService } from '../../servicios/auth/auth.service';
import { UserInterface } from '../../clases/usuario';
import { LeccionComponent } from '../dialogs/leccion/leccion.component';

@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.scss']
})
export class CursoDetalleComponent implements OnInit {

  private uid;
  private uidUser;
  curso: Curso
  actividades: Observable<Actividad[]>
  estudiantes: UserInterface[] = []
  tipoActividade: Observable<TipoActividad[]>
  dataSourceEstudiante;
  dataSourceActividad: MatTableDataSource<any>;
  // dataSourceEstudiante: MatTableDataSource < UserInterface [] > ;
  displayedColumnsEstudiante: string[] = ['usuario', 'nombres', 'apellidos', 'email'];
  displayedColumnsActividad: string[] = ['nombre', 'descripcion', 'inicio', 'fin', 'tipo', 'accion'];
  @ViewChild(MatSort) sort: MatSort;
  isProfesor: boolean;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public router: Router,
    private cursoService: CursoService,
    private authService: AuthService,
  ) {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.authService.getAuth().subscribe(data => {
      this.authService.getUser(data.uid).subscribe(user => {
        this.uidUser = user.id
        if (user.rol == "1") {
          this.isProfesor = true
        } else {
          this.isProfesor = false
        }
      })
    })
    this.cursoService.getCurso(this.uid).subscribe(curso => {
      this.curso = curso
    })
    this.actividades = this.cursoService.getActividades(this.uid)
    this.cursoService.getEstudiantes(this.uid).subscribe(estudiantes => {
      const users: UserInterface[] = []
      estudiantes.forEach(estudiante => {
        this.authService.getUser(estudiante.idUsuario).subscribe(user => {
          users.push(user)
        })
      })
      this.estudiantes = users
      this.dataSourceEstudiante = users;
      // let estudiantes:UserInterface[] = [];

    })
    this.actividades.subscribe(actividades => {
      // this.cursoService.getTipoActividades().subscribe(tipos=>{
      //  tipos.forEach(tipo=>{})
      // })
      this.dataSourceActividad = new MatTableDataSource(actividades);

      actividades.forEach(actividad => {
        if (actividad.tipo == "1") {
          actividad.tipo = "Foro"
        } else if (actividad.tipo == "2") {
          actividad.tipo = "Ensayo"
        } else if (actividad.tipo == "3") {
          actividad.tipo = "Lección"
        }
      })
    })
  }

  ngOnInit() {

  }
  // myControl = new FormControl();
  //  options: string[] = ['Juan Alvarez', 'Daniela Maldonado', 'Karen Lopez'];

  applyFilter(filterValue: string) {
    this.dataSourceActividad.filter = filterValue.trim().toLowerCase();
  }

  addActividad() {
    const dialogRef = this.dialog.open(AddActividadComponent, {
      data: {
        idCurso: this.uid,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  viewActividad(actividad) {
    if (actividad.tipo == "Lección") {
      const dialogLeccion = this.dialog.open(LeccionComponent, {
        data: { idActividad: actividad.id },
      });
    } else {
      this.router.navigate(['/actividad/' + actividad.id])
    }
  }
  editActividad(uid) {
    const dialogRef = this.dialog.open(EditActividadComponent, {
      data: { idActividad: uid },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  deleteActividad(uid) {
    this.cursoService.deleteActividad(uid)
  }
}
