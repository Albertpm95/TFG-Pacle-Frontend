import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAction } from '@models/acciones-usuario';

import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-actions-list',
  templateUrl: './actions-list.component.html',
  styleUrls: ['./actions-list.component.scss'],
})
export class ActionsListComponent {
  actionsList: UserAction[] = [];
  loaded: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {
    this.apiService.getUserActions().subscribe((actions) => {
      this.actionsList = actions;
      this.loaded = true;
    });
  }

  goTo(url: string): void {
    console.log('Going to: ', url);
    this.router.navigateByUrl(url);
  }
}
