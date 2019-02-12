import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { CursoService } from 'app/servicios/curso/curso.service';
import { AuthService } from '../servicios/auth/auth.service';
import { UsuarioCurso, Curso } from '../clases/curso';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  numCursos: number;
  nombre: string;
  curso: UsuarioCurso
  cursos: Observable<Curso[]>;
  usuarioCursos: Observable<UsuarioCurso[]>;

  isProfesor: boolean;


  constructor(
    //servicios metodos firebase
    private cursoService: CursoService,
    private authService: AuthService,
    public router: Router,
  ) {

    this.authService.getAuth().subscribe(user => {
      this.cursos = this.cursoService.getCursos(user.uid)
      this.authService.getUser(user.uid).subscribe(data => {
        this.nombre = `${data.nombres}`;
        //verifica rol del usuario
        if (data.rol == "1") {
          this.isProfesor = true
          this.cursoService.getCountCursos(user.uid).subscribe(snap => {
            this.numCursos = snap.size;
          });
        }
        else {
          this.usuarioCursos = this.cursoService.getUsuarioCurso(user.uid)
          this.usuarioCursos.subscribe(cursos => {
            let contactsList = [];
            cursos.forEach(curso => {
              this.cursoService.getCurso(curso.idCurso).subscribe(res => {
                let curse = res
                contactsList.push(curse)
              })
            })
            this.numCursos = contactsList.length
            this.cursos = of(contactsList)
          })
          this.isProfesor = false
        }
      })
    })
  }
  detalleCurso(curso) {
    if (curso.id) {
      this.router.navigate(['curso/' + curso.id]);

    }else if(curso.uid){

      this.router.navigate(['curso/' + curso.uid]);
    }
  }
  ngOnInit() {
  }

}
