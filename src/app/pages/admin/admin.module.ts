import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { PanelAdminComponent } from './admin.component';
import { HorariosComponent } from './horarios/horarios.component';
import { IdiomasComponent } from './idiomas/idiomas.component';

@NgModule({
  declarations: [
    PanelAdminComponent,
    IdiomasComponent,
    HorariosComponent,

  ],
  imports: [
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }