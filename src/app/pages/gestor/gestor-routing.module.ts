import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestorComponent } from './gestor.component';

const routes: Routes = [{ path: '', component: GestorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestorRoutingModule { }
