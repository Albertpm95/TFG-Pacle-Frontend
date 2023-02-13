import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { API, Roles } from '@constants';
import { ActaModule } from './acta/acta.module';
import { ActionsListComponent } from './actions_list/actions-list.component';
import { AlumnoModule } from './alumno/alumno.module';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent, title: 'Login' },
  {
    path: API.USUARIO_ACCIONES,
    component: ActionsListComponent,
  },
  {
    path: Roles.ACTA,
    loadChildren: () => ActaModule,
    title: 'Acta',
  },
  {
    path: Roles.ALUMNO,
    loadChildren: () => AlumnoModule,
    title: 'Alumno',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
