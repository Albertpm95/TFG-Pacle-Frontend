import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionsListComponent } from './actions_list/actions-list.component';

const routes: Routes = [
  { path: '', component: ActionsListComponent },
  { path: 'acta', loadChildren: () => import('./acta/acta.module').then(m => m.ActaModule) },
  { path: 'alumno', loadChildren: () => import('./alumno/alumno.module').then(m => m.AlumnoModule) },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }