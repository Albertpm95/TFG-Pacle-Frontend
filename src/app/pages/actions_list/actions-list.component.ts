import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ACTION_LIST, API_ENDPOINTS } from '@constants'

@Component({
  selector: 'app-actions-list',
  templateUrl: './actions-list.component.html',
  styleUrls: ['./actions-list.component.scss'],
})
export class ActionsListComponent {
  adminActions = ACTION_LIST.ADMIN_LIST
  correctorActions = ACTION_LIST.CORRECTOR_LIST
  gestorActions = ACTION_LIST.GESTOR_LIST
  apiEndpoints = API_ENDPOINTS
}
