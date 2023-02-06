import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionsListComponent } from './actions_list/actions-list.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  { path: '', component: ActionsListComponent }]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }