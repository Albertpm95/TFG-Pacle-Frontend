import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { CargaComponent } from './carga/carga.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    CargaComponent,
    ListComponent,
    EditComponent
  ],
  imports: [CommonModule, AlumnoRoutingModule],
})
export class AlumnoModule {}
