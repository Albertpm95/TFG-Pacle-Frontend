import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { COMPONENTS } from '@constants'
import { EditionComponent } from './edition/edition.component'
import { ListComponent } from './list/list.component'

const routes: Routes = [
  {
    path: COMPONENTS.EDITION,
    component: EditionComponent,
    title: 'Edicion de usuario',
  },
  {
    path: COMPONENTS.LIST,
    component: ListComponent,
    title: 'Lista de usuarios',
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
