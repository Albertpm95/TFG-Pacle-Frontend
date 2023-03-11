import { NgModule } from '@angular/core'

import { SharedModule } from '@shared/shared.module'

import { ActaRoutingModule } from './acta-routing.module'

import { EditionModule } from './edition/edition.module'
import { ListComponent } from './list/list.component'

@NgModule({
  declarations: [ListComponent],
  imports: [
    ActaRoutingModule,
    EditionModule,
    SharedModule
  ],
})
export class ActaModule { }
