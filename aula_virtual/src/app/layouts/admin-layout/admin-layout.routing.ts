import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../admin/user-profile/user-profile.component';
import { AuthGuard } from '../../servicios/auth-guard/auth.guard';
import { CursosComponent } from '../../admin/cursos/cursos.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent,canActivate: [AuthGuard] },
    { path: 'perfil',   component: UserProfileComponent,canActivate: [AuthGuard] },
    { path: 'cursos',        component: CursosComponent,canActivate: [AuthGuard] },
];
