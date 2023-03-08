import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { ListComponent } from './list/list.component';
import { EditionComponent } from './edition/edition.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    ListComponent,
    EditionComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    SharedModule
  ]
})
export class UsuarioModule { }
