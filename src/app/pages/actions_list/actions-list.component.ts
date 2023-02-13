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
  loading: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {
    this.apiService.getUserActions().subscribe((actions) => {
      this.actionsList = actions;
    });
  }

  ngOnInit() {
    this.loaded = true;
  }

  goTo(url: string): void {
    this.loading = true;
    console.log(this.loading);
    console.log('Going to: ', url);
    this.router.navigateByUrl(url);
  }

  userActionsTrackBy(index: any, user: { id: any; }) {
    return user.id;
  }
}
