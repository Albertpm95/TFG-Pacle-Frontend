import { Component } from '@angular/core';
import { UserAction } from '@models/acciones-usuario';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-actions-list',
  templateUrl: './actions-list.component.html',
  styleUrls: ['./actions-list.component.scss']
})
export class ActionsListComponent {

  actions_list: UserAction[] = [];

  constructor(private apiService: ApiService) {
    this.apiService.getUserActions().subscribe(actions => { this.actions_list = actions; })
  }

}
