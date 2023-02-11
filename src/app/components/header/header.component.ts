import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { API, Constants, Features } from '@constants';

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
    this.router.navigateByUrl(Features.LOGIN);
  }

  volver() {
    console.log('Volviendo a ', API.USUARIO_ACCIONES);
    this.router.navigateByUrl(API.USUARIO_ACCIONES);
  }
}
