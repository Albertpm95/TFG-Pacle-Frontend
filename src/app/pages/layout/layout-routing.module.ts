import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActaComponent } from './acta/acta.component';
import { ActionsListComponent } from './actions_list/actions-list.component';

const routes: Routes = [
  { path: '', component: ActionsListComponent },
  { path: 'convocatorias/create', component: ActaComponent },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }