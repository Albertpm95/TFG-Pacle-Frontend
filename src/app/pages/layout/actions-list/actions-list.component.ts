import { Component } from '@angular/core';
import { UserAction } from '@models/acciones-usuario';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-actions-list',
  templateUrl: './actions-list.component.html',
  styleUrls: ['./actions-list.component.scss']
})
export class ActionsListComponent {

  actionsList: UserAction[] = [];
  loaded: boolean = false;

  constructor(private apiService: ApiService) {
    this.apiService.getUserActions().subscribe(actions => { this.actionsList = actions; console.log(this.actionsList); this.loaded = true; })
  }

  goTo(userAction: UserAction): void {
    console.log(userAction)
  }
}
