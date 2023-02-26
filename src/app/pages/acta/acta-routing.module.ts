import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { Features } from '@constants'
import { EditionActaComponent } from './edition/edition.component'
import { ListActaComponent } from './list/list.component'

const routes: Routes = [
  { path: Features.EDIT, component: EditionActaComponent },
  { path: Features.LIST, component: ListActaComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActaRoutingModule { }
