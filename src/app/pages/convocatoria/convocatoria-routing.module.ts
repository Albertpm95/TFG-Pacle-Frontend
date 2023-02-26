import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Features } from '@constants';
import { CorrectConvocatoriaComponent } from './correct/correct.component';
import { CreateConvocatoriaComponent } from './create/create.component';
import { ListConvocatoriaComponent } from './list/list.component';

const routes: Routes = [
  { path: Features.CREATE, component: CreateConvocatoriaComponent },
  { path: Features.LIST, component: ListConvocatoriaComponent },
  { path: Features.CORRECT, component: CorrectConvocatoriaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvocatoriaRoutingModule { }
