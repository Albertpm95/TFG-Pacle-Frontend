import { Component } from '@angular/core';
import { ACTION_LIST } from '@constants';

@Component({
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent { actionsList = ACTION_LIST.MENU }
