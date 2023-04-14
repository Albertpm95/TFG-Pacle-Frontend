import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'
import { EditionComponent } from './edition.component'
import { ComprensionLectoraComponent } from './comprension-lectora/comprension-lectora.component'
import { ComprensionAuditivaComponent } from './comprension-auditiva/comprension-auditiva.component'
import { ExpresionEscritaComponent } from './expresion-escrita/expresion-escrita.component'
import { ExpresionOralComponent } from './expresion-oral/expresion-oral.component'

@NgModule({
  declarations: [
    EditionComponent,
    ComprensionLectoraComponent,
    ComprensionAuditivaComponent,
    ExpresionEscritaComponent,
    ExpresionOralComponent,
  ],
  imports: [SharedModule],
})
export class EditionModule {}
