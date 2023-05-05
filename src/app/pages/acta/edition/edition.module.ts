import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'
import { EditionComponent } from './edition.component'
import { ParteComponent } from './parte/parte.component'

@NgModule({
  declarations: [EditionComponent, ParteComponent],
  imports: [SharedModule]
})
export class EditionModule {}
