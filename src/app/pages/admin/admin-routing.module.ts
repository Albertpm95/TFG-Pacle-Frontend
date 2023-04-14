import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PanelAdminComponent } from './admin.component'

const routes: Routes = [
  {
    path: 'panel',
    component: PanelAdminComponent,
    title: 'Panel de administracion',
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
