import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { COMPONENTS, CONSTANTS, MODULES } from '@constants';
import { Acta } from '@models/acta';
import { Alumno } from '@models/alumno';

import { ApiService } from '@services/api.service';

@Component({
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent {
  constructor() {

  }
  ngOnInit(): void {

  }
}
