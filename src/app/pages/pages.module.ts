import { ActaModule } from './acta/acta.module';
import { ActionsListComponent } from './actions_list/actions-list.component';
import { AlumnoModule } from './alumno/alumno.module';
import { CommonModule } from '@angular/common';
import { ConvocatoriaModule } from './convocatoria/convocatoria.module';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, ActionsListComponent],
  imports: [
    ActaModule,
    AlumnoModule,
    CommonModule,
    ConvocatoriaModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    PagesRoutingModule,
    ReactiveFormsModule,
  ],
})
export class PagesModule { }
