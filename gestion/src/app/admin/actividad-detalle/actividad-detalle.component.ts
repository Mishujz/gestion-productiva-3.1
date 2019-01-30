import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../servicios/curso/curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad, Pregunta } from '../../clases/curso';

@Component({
  selector: 'app-actividad-detalle',
  templateUrl: './actividad-detalle.component.html',
  styleUrls: ['./actividad-detalle.component.scss']
})
export class ActividadDetalleComponent implements OnInit {

  private uid;
  actividad: Actividad
  pregunta: Pregunta


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cursoService: CursoService,
  ) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.cursoService.getActividad(this.uid).subscribe(actividad => {
      this.actividad = actividad
      this.cursoService.getPregunta(this.uid).subscribe(pregunta=>{
        this.pregunta = pregunta

      })
    })
  }
  goToCurso(uid){
    this.router.navigate(['/curso/'+uid])
  }

}
