import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Constants } from '@constants';
import { CargaComponent } from './carga/carga.component';

const routes: Routes = [
  {
    path: 'upload',
    component: CargaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnoRoutingModule {}
