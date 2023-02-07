import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ActionsListComponent } from './actions_list/actions-list.component';
import { ComponentsModule } from '@components/components.module';
import { MatSelectModule } from '@angular/material/select';

import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    LayoutComponent,
    ActionsListComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ComponentsModule,
    MatListModule,
  ]
})
export class LayoutModule { }
