import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '@constants';

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
    this.router.navigateByUrl('login');
  }

  volver() {
    console.log('Volviendo a ', Constants.USUARIO_ACCIONES);
    this.router.navigateByUrl(Constants.USUARIO_ACCIONES);
  }
}
