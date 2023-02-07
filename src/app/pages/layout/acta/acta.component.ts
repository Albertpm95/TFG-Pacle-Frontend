import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Constants } from 'app/constants';

@Component({
  selector: 'app-acta',
  templateUrl: './acta.component.html',
  styleUrls: ['./acta.component.scss']
})
export class ActaComponent {
  actaForm: FormGroup;
  loading: boolean = false;
  constants = Constants;
  constructor(private formBuilder: FormBuilder) {
    this.actaForm = this.formBuilder.group({
      lenguaje: ['', Validators.required], //'Español' | 'English' | 'Català' | 'Français' | 'Chainese' | 'Deutsch';
      tipo: ['', Validators.required], //Ordinaria' | 'Extraordinaria';
      fecha: ['', Validators.required], //Date;
      activa: ['', Validators.required], //boolean;
    })
  }
}
