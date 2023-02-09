import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Constants } from '@constants';
import { ActaModule } from './acta/acta.module';
import { AlumnoModule } from './alumno/alumno.module';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: Constants.ACTA,
    loadChildren: () => ActaModule,
  },
  {
    path: Constants.USUARIO,
  },
  {
    path: Constants.ALUMNO,
    loadChildren: () => AlumnoModule,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
