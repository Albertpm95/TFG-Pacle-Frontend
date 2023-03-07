import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { COMPONENTS } from '@constants';

import { CargaComponent } from './carga/carga.component';
import { EditionComponent } from './edition/edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: COMPONENTS.UPLOAD,
    component: CargaComponent,
    title: 'Cargar lista de alumnos'
  },
  { path: COMPONENTS.EDITION, component: EditionComponent, title: 'Edicion alumno' },
  { path: COMPONENTS.LIST, component: ListComponent, title: 'Lista de alumnos' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnoRoutingModule { }
