import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

import { ActaRoutingModule } from './acta-routing.module';
import { ActaComponent } from './acta.component';


@NgModule({
  declarations: [
    ActaComponent
  ],
  imports: [
    CommonModule,
    ActaRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatSelectModule,
  ]
})
export class ActaModule { }
