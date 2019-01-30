import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Curso, TipoActividad, Actividad } from '../../clases/curso';
import { CursoService } from '../../servicios/curso/curso.service';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort } from '@angular/material';
import { AddActividadComponent } from '../dialogs/add-actividad/add-actividad.component';
import { EditActividadComponent } from '../dialogs/edit-actividad/edit-actividad.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.scss']
})
export class CursoDetalleComponent implements OnInit {

  private uid;
  curso: Curso
  actividades: Observable<Actividad[]>
  estudiantes: Observable<any[]>
  tipoActividade: Observable<TipoActividad[]>
  dataSourceActividad: MatTableDataSource<any>;
  displayedColumnsActividad: string[] = ['nombre', 'descripcion', 'inicio', 'fin', 'tipo', 'accion'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public router: Router,
    private cursoService: CursoService,
  ) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    console.log(this.uid)
    this.cursoService.getCurso(this.uid).subscribe(curso => {
      this.curso = curso
    })
    this.actividades = this.cursoService.getActividades(this.uid)
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
        } else {
          actividad.tipo = "Lección"
        }
      })
    })
  }
  // myControl = new FormControl();
  //  options: string[] = ['Juan Alvarez', 'Daniela Maldonado', 'Karen Lopez'];

  applyFilter(filterValue: string) {
    this.dataSourceActividad.filter = filterValue.trim().toLowerCase();
  }

  addActividad() {
    const dialogRef = this.dialog.open(AddActividadComponent, {
      data: { idCurso: this.uid },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  viewActividad(uid) {
    this.router.navigate(['/actividad/'+uid])
  }
  editActividad(uid){
    console.log(uid)
    const dialogRef = this.dialog.open(EditActividadComponent, {
      data: { idActividad: uid },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
