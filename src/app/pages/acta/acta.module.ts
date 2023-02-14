import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
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
import { ActaRoutingModule } from './acta-routing.module'
import { CorrectActaComponent } from './correct/correct.component'
import { CreateActaComponent } from './create/create.component'
import { ListActaComponent } from './list/list.component'

@NgModule({
  declarations: [CreateActaComponent, ListActaComponent, CorrectActaComponent],
  imports: [
    CommonModule,
    ActaRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
})
export class ActaModule {}
