import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateActaComponent } from './create/create.component';
import { ListActaComponent } from './list/list.component';

const routes: Routes = [
  { path: 'create', component: CreateActaComponent },
  { path: 'list', component: ListActaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActaRoutingModule { }
