import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { IdiomasComponent } from './idiomas/idiomas.component';
import { HorariosComponent } from './horarios/horarios.component';
import { TiposComponent } from './tipos/tipos.component';


@NgModule({
  declarations: [
    AdminComponent,
    IdiomasComponent,
    HorariosComponent,
    TiposComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
