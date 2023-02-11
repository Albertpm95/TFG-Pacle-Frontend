import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Features } from '@constants';
import { CreateActaComponent } from './create/create.component';
import { ListActaComponent } from './list/list.component';

const routes: Routes = [
  { path: Features.CREATE, component: CreateActaComponent },
  { path: Features.LIST, component: ListActaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActaRoutingModule {}
