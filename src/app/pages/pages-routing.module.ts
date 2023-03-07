import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MODULES } from '@constants'
import { ActaModule } from './acta/acta.module'
import { AdminModule } from './admin/admin.module'
import { AlumnoModule } from './alumno/alumno.module'
import { ConvocatoriaModule } from './convocatoria/convocatoria.module'
import { LoginComponent } from './login/login.component'
import { MenuComponent } from './menu/menu.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'menu', component: MenuComponent, title: 'Menu' },
  {
    path: MODULES.ACTA,
    loadChildren: () => ActaModule,
    title: 'Acta',
  },
  {
    path: MODULES.ALUMNO,
    loadChildren: () => AlumnoModule,
    title: 'Alumno',
  },
  {
    path: MODULES.CONVOCATORIA,
    loadChildren: () => ConvocatoriaModule,
    title: 'Convocatoria',
  },
  {
    path: MODULES.ADMIN,
    loadChildren: () => AdminModule,
    title: 'Panel de admin'
  },
  {
    path: '**',
    redirectTo: 'login',
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
