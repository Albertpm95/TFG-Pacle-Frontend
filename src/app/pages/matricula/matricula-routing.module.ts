import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { COMPONENTS } from '@constants'
import { MatricularComponent } from './matricular/matricular.component'

const routes: Routes = [
  {
    path: COMPONENTS.REGISTER,
    component: MatricularComponent,
    title: 'Matricular alumno'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatriculaRoutingModule {}
