import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesModule } from '@pages/pages.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => PagesModule
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true,
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
