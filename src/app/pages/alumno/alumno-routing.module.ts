import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Features } from '@constants';
import { CargaComponent } from './carga/carga.component';

const routes: Routes = [
  {
    path: Features.UPLOAD,
    component: CargaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnoRoutingModule {}
