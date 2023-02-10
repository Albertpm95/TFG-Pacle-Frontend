import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActaModule } from './acta/acta.module';
import { ActionsListComponent } from './actions_list/actions-list.component';
import { AlumnoModule } from './alumno/alumno.module';
import { LoginComponent } from './login/login.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [LoginComponent, ActionsListComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressBarModule,
    MatButtonModule,
    MatListModule,
    AlumnoModule,
    ActaModule,
  ],
})
export class PagesModule {}
