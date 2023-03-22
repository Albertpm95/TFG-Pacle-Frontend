import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { PanelAdminComponent } from './admin.component';
import { HorariosComponent } from './horarios/horarios.component';
import { IdiomasComponent } from './idiomas/idiomas.component';
import { GenerosComponent } from './generos/generos.component';
import { NivelesComponent } from './niveles/niveles.component';

@NgModule({
  declarations: [
    PanelAdminComponent,
    IdiomasComponent,
    HorariosComponent,
    GenerosComponent,
    NivelesComponent,

  ],
  imports: [
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
