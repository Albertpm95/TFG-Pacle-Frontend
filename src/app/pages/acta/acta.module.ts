import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'
import { ActaRoutingModule } from './acta-routing.module'
import { EditionComponent } from './edition/edition.component'
import { ListComponent } from './list/list.component'

@NgModule({
  declarations: [EditionComponent, ListComponent],
  imports: [
    ActaRoutingModule,
    SharedModule
  ],
})
export class ActaModule { }
