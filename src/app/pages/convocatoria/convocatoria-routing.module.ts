import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Features } from '@constants';
import { EditionConvocatoriaComponent } from './edition/edition.component';
import { ListConvocatoriaComponent } from './list/list.component';

const routes: Routes = [
  { path: Features.EDIT, component: EditionConvocatoriaComponent, title: 'Edicion convocatoria' },
  { path: Features.LIST, component: ListConvocatoriaComponent, title: 'Lista de convocatorias' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvocatoriaRoutingModule { }
