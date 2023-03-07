import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HorariosComponent } from './horarios/horarios.component';
import { IdiomasComponent } from './idiomas/idiomas.component';
import { TiposComponent } from './tipos/tipos.component';

@NgModule({
  declarations: [
    AdminComponent,
    IdiomasComponent,
    HorariosComponent,
    TiposComponent
  ],
  imports: [
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
