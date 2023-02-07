import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ActaRoutingModule } from './acta-routing.module';
import { CreateActaComponent } from './create/create.component';
import { ListActaComponent } from './list/list.component';


@NgModule({
  declarations: [
    CreateActaComponent,
    ListActaComponent
  ],
  imports: [
    CommonModule,
    ActaRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatDatetimePickerModule
  ],

})
export class ActaModule { }
