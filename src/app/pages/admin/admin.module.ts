import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { PanelAdminComponent } from './admin.component';
import { HorariosComponent } from './horarios/horarios.component';
import { GenerosComponent } from './generos/generos.component';
import { NivelesComponent } from './niveles/niveles.component';
import { LenguajesComponent } from './lenguajes/lenguajes.component';

@NgModule({
  declarations: [
    PanelAdminComponent,
    LenguajesComponent,
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
