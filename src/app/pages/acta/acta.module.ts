import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'
import { ActaRoutingModule } from './acta-routing.module'
import { EditionActaComponent } from './edition/edition.component'
import { ListActaComponent } from './list/list.component'

@NgModule({
  declarations: [EditionActaComponent, ListActaComponent],
  imports: [
    ActaRoutingModule,
    SharedModule
  ],
})
export class ActaModule { }
