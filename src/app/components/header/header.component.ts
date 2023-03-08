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
    console.log('Constructor header');
  }

  logout() {
    this.router.navigateByUrl('/' + MODULES.LOGIN);
  }

  volver() {
    this.router.navigateByUrl('/' + COMPONENTS.MENU);
  }
}
