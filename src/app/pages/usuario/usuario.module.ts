import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { EditionComponent } from './edition/edition.component';
import { ListComponent } from './list/list.component';
import { UsuarioRoutingModule } from './usuario-routing.module';


@NgModule({
  declarations: [
    ListComponent,
    EditionComponent
  ],
  imports: [
    UsuarioRoutingModule,
    SharedModule
  ]
})
export class UsuarioModule { }
