import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'administrador', loadChildren: () => import('./administrador/administrador.module').then(m => m.AdministradorModule) },
	{ path: 'gestor', loadChildren: () => import('./gestor/gestor.module').then(m => m.GestorModule) },
	{ path: 'corrector', loadChildren: () => import('./corrector/corrector.module').then(m => m.CorrectorModule) }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule { }
