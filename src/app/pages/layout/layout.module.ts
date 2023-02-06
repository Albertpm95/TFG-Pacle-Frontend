import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ActionsListComponent } from './actions_list/actions-list.component';
import { ComponentsModule } from '@components/components.module';

import { MatListModule } from '@angular/material/list';
import { ActaComponent } from './acta/acta.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ActionsListComponent,
    ActaComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ComponentsModule,
    MatListModule
  ]
})
export class LayoutModule { }
