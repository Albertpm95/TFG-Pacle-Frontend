import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { CargaComponent } from './carga/carga.component';

@NgModule({
  declarations: [
    CargaComponent
  ],
  imports: [CommonModule, AlumnoRoutingModule],
})
export class AlumnoModule {}
