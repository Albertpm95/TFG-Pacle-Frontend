import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorrectorComponent } from './corrector.component';

const routes: Routes = [{ path: '', component: CorrectorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorrectorRoutingModule { }
