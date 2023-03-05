import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Constants, Routers } from '@constants';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: Constants.IDIOMAS, component: AdminComponent, title: 'Idiomas' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
