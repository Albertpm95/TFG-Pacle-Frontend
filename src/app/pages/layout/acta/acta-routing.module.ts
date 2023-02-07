import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActaComponent } from './acta.component';

const routes: Routes = [{ path: 'create', component: ActaComponent }, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActaRoutingModule { }
