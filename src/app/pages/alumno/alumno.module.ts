import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { CargaComponent } from './carga/carga.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    CargaComponent,
    ListComponent,
    EditComponent
  ],
  imports: [SharedModule, AlumnoRoutingModule],
})
export class AlumnoModule { }
