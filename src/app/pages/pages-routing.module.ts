import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { COMPONENTS, MODULES } from '@constants'
import { ActaModule } from './acta/acta.module'
import { AdminModule } from './admin/admin.module'
import { AlumnoModule } from './alumno/alumno.module'
import { ConvocatoriaModule } from './convocatoria/convocatoria.module'
import { LoginComponent } from './login/login.component'
import { MenuComponent } from './menu/menu.component'
import { UsuarioModule } from './usuario/usuario.module'
import { WildcardComponent } from './wildcard/wildcard.component'

const routes: Routes = [
  { path: COMPONENTS.LOGIN, component: LoginComponent, title: 'Login' },
  { path: COMPONENTS.MENU, component: MenuComponent, title: 'Menu' },
  {
    path: MODULES.ACTA,
    loadChildren: () => ActaModule,
    title: 'Acta'
  },
  {
    path: MODULES.ALUMNO,
    loadChildren: () => AlumnoModule,
    title: 'Alumno'
  },
  {
    path: MODULES.CONVOCATORIA,
    loadChildren: () => ConvocatoriaModule,
    title: 'Convocatoria'
  },
  {
    path: MODULES.ADMIN,
    loadChildren: () => AdminModule,
    title: 'Panel de admin'
  },
  {
    path: MODULES.USUARIO,
    loadChildren: () => UsuarioModule,
    title: 'Usuario'
  },
  {
    path: '',
    redirectTo: COMPONENTS.LOGIN,
    pathMatch: 'prefix'
  },
  {
    path: '**',
    component: WildcardComponent,
    title: '404'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
