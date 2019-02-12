import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../admin/user-profile/user-profile.component';
import { CursosComponent } from '../../admin/cursos/cursos.component';
import { AddCursoComponent } from '../../admin/dialogs/add-curso/add-curso.component';
import { CursoDetalleComponent } from '../../admin/curso-detalle/curso-detalle.component';
import { AddActividadComponent } from '../../admin/dialogs/add-actividad/add-actividad.component';
import { PreguntasComponent } from '../../admin/preguntas/preguntas.component';
import { ActividadDetalleComponent } from '../../admin/actividad-detalle/actividad-detalle.component';
import { EditActividadComponent } from '../../admin/dialogs/edit-actividad/edit-actividad.component';
import { ActividadEstudianteComponent } from '../../admin/dialogs/actividad-estudiante/actividad-estudiante.component';
import { LeccionComponent } from '../../admin/dialogs/leccion/leccion.component';
// For MDB Angular Free
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatTabsModule,
  MatCardModule,
  MatIconModule,
  MatDialogModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatTableModule,
  MatRadioModule,
  MatListModule,

} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatTableModule,
    MatRadioModule,
    MatListModule,
    CarouselModule,
    WavesModule ,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    CursosComponent,
    AddCursoComponent,
    CursoDetalleComponent,
    AddActividadComponent,
    PreguntasComponent,
    ActividadDetalleComponent,
    EditActividadComponent,
    ActividadEstudianteComponent,
    LeccionComponent,
  ],
  entryComponents:[
    AddCursoComponent,
    AddActividadComponent,
    EditActividadComponent,
    ActividadEstudianteComponent,
    LeccionComponent,
  ],
  providers:[
    MatDatepickerModule,
  ]
})

export class AdminLayoutModule {}
