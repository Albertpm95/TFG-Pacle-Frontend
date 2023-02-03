import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorrectorRoutingModule } from './corrector-routing.module';
import { CorrectorComponent } from './corrector.component';


@NgModule({
  declarations: [
    CorrectorComponent
  ],
  imports: [
    CommonModule,
    CorrectorRoutingModule
  ]
})
export class CorrectorModule { }
