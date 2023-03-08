import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { COMPONENTS, MODULES } from '@constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public router: Router) {
  }

  logout() {
    this.router.navigateByUrl('/' + COMPONENTS.LOGIN);
  }

  volver() {
    this.router.navigateByUrl('/' + COMPONENTS.MENU);
  }
}
