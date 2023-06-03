import { NgModule } from '@angular/core'

import { SharedModule } from '@shared/shared.module'

import { ActaModule } from './acta/acta.module'
import { AdminModule } from './admin/admin.module'
import { AlumnoModule } from './alumno/alumno.module'
import { ConvocatoriaModule } from './convocatoria/convocatoria.module'
import { LoginComponent } from './login/login.component'
import { MatriculaModule } from './matricula/matricula.module'
import { MenuComponent } from './menu/menu.component'
import { PagesRoutingModule } from './pages-routing.module'
import { WildcardComponent } from './wildcard/wildcard.component'

@NgModule({
  declarations: [LoginComponent, MenuComponent, WildcardComponent],
  imports: [
    ActaModule,
    AdminModule,
    AlumnoModule,
    ConvocatoriaModule,
    SharedModule,
    MatriculaModule,
    PagesRoutingModule
  ],
  exports: []
})
export class PagesModule {}
