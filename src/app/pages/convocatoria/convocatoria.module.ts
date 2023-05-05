import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '@shared/shared.module'
import { ConvocatoriaRoutingModule } from './convocatoria-routing.module'
import { EditionComponent } from './edition/edition.component'
import { ListComponent } from './list/list.component'

@NgModule({
  declarations: [EditionComponent, ListComponent],
  imports: [CommonModule, ConvocatoriaRoutingModule, SharedModule]
})
export class ConvocatoriaModule {}
