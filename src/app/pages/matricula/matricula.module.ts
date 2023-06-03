import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '@shared/shared.module'
import { MatriculaRoutingModule } from './matricula-routing.module'
import { MatricularComponent } from './matricular/matricular.component'

@NgModule({
  declarations: [MatricularComponent],
  imports: [CommonModule, MatriculaRoutingModule, SharedModule]
})
export class MatriculaModule {}
