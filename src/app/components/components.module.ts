import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'
import { ConvocatoriaAlumnoSelectorDialogComponent } from './dialogs/convocatoria-alumno-selector/convocatoria-alumno-selector.component'
import { FooterComponent } from './footer/footer.component'
import { HeaderComponent } from './header/header.component'

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ConvocatoriaAlumnoSelectorDialogComponent],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent, FooterComponent]
})
export class ComponentsModule {}
