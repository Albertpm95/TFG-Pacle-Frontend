import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ACTION_LIST } from '@constants'

@Component({
  selector: 'app-actions-list',
  templateUrl: './actions-list.component.html',
  styleUrls: ['./actions-list.component.scss'],
})
export class ActionsListComponent {

  adminActions = ACTION_LIST.ADMIN_LIST
  correctorActions = ACTION_LIST.CORRECTOR_LIST
  gestorActions = ACTION_LIST.GESTOR_LIST
  constructor(private router: Router) { }

  public goTo(url: string): void {
    console.log('Going to: ', url);
    this.router.navigateByUrl(url);
  }
}
