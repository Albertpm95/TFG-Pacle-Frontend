import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ActionsListComponent } from './actions-list/actions-list.component';
import { ComponentsModule } from '@components/components.module';

import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    LayoutComponent,
    ActionsListComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ComponentsModule,
    MatListModule
  ]
})
export class LayoutModule { }
