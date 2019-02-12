import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../admin/user-profile/user-profile.component';
import { AuthGuard } from '../../servicios/auth-guard/auth.guard';
import { CursosComponent } from '../../admin/cursos/cursos.component';
import { CursoDetalleComponent } from '../../admin/curso-detalle/curso-detalle.component';
import { PreguntasComponent } from '../../admin/preguntas/preguntas.component';
import { ActividadDetalleComponent } from '../../admin/actividad-detalle/actividad-detalle.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'cursos', component: CursosComponent, canActivate: [AuthGuard] },
  { path: 'curso/:uid', component: CursoDetalleComponent, canActivate: [AuthGuard] },
  { path: 'pregunta/:uid', component: PreguntasComponent, canActivate: [AuthGuard] },
  { path: 'actividad/:uid', component: ActividadDetalleComponent, canActivate: [AuthGuard] },
];
