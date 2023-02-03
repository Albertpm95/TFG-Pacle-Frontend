import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from './components/components.module';
import { LoginComponent } from './login/login.component';
import { PagesRoutingModule } from './pages-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';

@NgModule({
	declarations: [
		LoginComponent
	],
	imports: [
		CommonModule,
		PagesRoutingModule,
		ComponentsModule,
		MatFormFieldModule,
		MatCardModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule
	]
})
export class PagesModule { }
