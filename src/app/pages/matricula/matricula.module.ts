import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '@shared/shared.module'
import { MatricularComponent } from './matricular/matricular.component'

@NgModule({
  declarations: [MatricularComponent],
  imports: [CommonModule, SharedModule]
})
export class MatriculaModule {}
