import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { API_ENDPOINTS, Routers } from '@constants'
import { ActaModule } from './acta/acta.module'
import { ActionsListComponent } from './actions_list/actions-list.component'
import { AdminModule } from './admin/admin.module'
import { AlumnoModule } from './alumno/alumno.module'
import { ConvocatoriaModule } from './convocatoria/convocatoria.module'
import { LoginComponent } from './login/login.component'

const routes: Routes = [
  { path: '', component: LoginComponent, title: 'Login' },
  {
    path: API_ENDPOINTS.USUARIO_ACCIONES,
    component: ActionsListComponent,
    title: 'Menu de acciones',
  },
  {
    path: Routers.ACTA,
    loadChildren: () => ActaModule,
    title: 'Acta',
  },
  {
    path: Routers.ALUMNO,
    loadChildren: () => AlumnoModule,
    title: 'Alumno',
  },
  {
    path: Routers.CONVOCATORIA,
    loadChildren: () => ConvocatoriaModule,
    title: 'Convocatoria',
  },
  {
    path: Routers.ADMIN,
    loadChildren: () => AdminModule,
    title: 'Panel de admin'
  },
  {
    path: '**',
    redirectTo: '',
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
