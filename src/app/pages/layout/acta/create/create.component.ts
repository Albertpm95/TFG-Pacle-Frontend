import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Acta } from '@models/acta';
import { ApiService } from '@services/api.service';
import { Constants } from 'app/constants';

@Component({
  selector: 'app-acta',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateActaComponent {
  constants = Constants;
  actaForm: FormGroup;
  acta: Acta = new Acta();
  loading: boolean = false;
  listaIdiomasActa: string[] = [];
  tiposActa: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.actaForm = this.formBuilder.group({
      lenguaje: ['', Validators.required], //'Español' | 'English' | 'Català' | 'Français' | 'Chainese' | 'Deutsch';
      tipo: ['', Validators.required], //Ordinaria' | 'Extraordinaria';
      fecha: [Date.now, Validators.required], //Date;
      fecha_test_1: [Date.now, Validators.required], //Date;
      fecha_test_2: [Date.now, Validators.required], //Date;
      activa: ['', Validators.required], //boolean;
      pesoMaximoParteComprensionLectora: [0, Validators.required],
      pesomaximoParteExpresionEscrita: [0, Validators.required],
      pesomaximoParteComprensionAuditiva: [0, Validators.required],
      pesomaximoParteExpresionOral: [0, Validators.required],
    });

    this.apiService.getIdiomasActa().subscribe((idiomas) => {
      this.listaIdiomasActa = idiomas;
    });

    this.apiService.getTiposActa().subscribe((tipos) => {
      this.tiposActa = tipos;
    });
  }

  createActa() {
    this.loading = true;
    console.log(this.actaForm);
    if (this.actaForm.valid) {
      (this.acta.lenguaje = this.actaForm.controls['lenguaje'].value),
        (this.acta.tipo = this.actaForm.controls['tipo'].value),
        (this.acta.fecha = this.actaForm.controls['fecha'].value),
        (this.acta.activa = this.actaForm.controls['activa'].value);
    }
    console.log(this.acta);
    this.loading = false;
  }
}
