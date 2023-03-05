import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Constants, Routers } from '@constants';
import { AdminComponent } from './admin.component';
import { IdiomasComponent } from './idiomas/idiomas.component';
import { TiposComponent } from './tipos/tipos.component';

const routes: Routes = [
  { path: Constants.IDIOMAS, component: AdminComponent, title: 'Idiomas' },
  { path: Constants.HORARIOS, component: IdiomasComponent, title: 'Idiomas' },
  { path: Constants.TIPOS, component: TiposComponent, title: 'Idiomas' },
  { path: '', component: AdminComponent, title: 'Panel de administracion' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
