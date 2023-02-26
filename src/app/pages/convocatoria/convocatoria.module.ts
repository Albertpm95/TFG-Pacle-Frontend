import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { ConvocatoriaRoutingModule } from './convocatoria-routing.module'
import { ListConvocatoriaComponent } from './list/list.component'
import { EditionConvocatoriaComponent } from './edition/edition.component'

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'


@NgModule({
  declarations: [EditionConvocatoriaComponent, ListConvocatoriaComponent],
  imports: [
    CommonModule,
    ConvocatoriaRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
})
export class ConvocatoriaModule { }
