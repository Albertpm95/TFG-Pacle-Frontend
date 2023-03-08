import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CONSTANTS } from '@constants';
import { Convocatoria } from '@models/convocatoria';
import { Horario } from '@models/horario';
import { Idioma } from '@models/idioma';
import { Tipo } from '@models/tipo';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent {
  constants = CONSTANTS
  convocatoriaNuevaForm: FormGroup = new FormGroup({})
  convocatoria: Convocatoria = new Convocatoria()
  loading: boolean = false
  listaIdiomasConvocatoria$: Observable<Idioma[]> = this.apiService.getIdiomasConvocatoria()
  listaHorariosConvocatoria$: Observable<Horario[]> = this.apiService.getHorariosConvocatoria()

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private activactedRoute: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    let idConvocatoria = this.activactedRoute.snapshot.params['idConvocatoria']
    if (idConvocatoria) {
      console.log(idConvocatoria)
      this.loadForm(idConvocatoria)
    }
    this.initializeForm()
  }

  private initializeForm(): void {
    this.convocatoriaNuevaForm = this.formBuilder.group({
      activa: [CONSTANTS.ESTADO_POR_DEFECTO, Validators.required], //boolean;
      fechaParcial: [Date.now, Validators.required], // Date sin el horario
      horarioParcial: ['09:00', Validators.required],
      lenguaje: [CONSTANTS.LENGUAJE_POR_DEFECTO, Validators.required],
      pesomaximoParteComprensionAuditiva: [CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO, Validators.required],
      pesoMaximoParteComprensionLectora: [CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO, Validators.required],
      pesomaximoParteExpresionEscrita: [CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO, Validators.required],
      pesomaximoParteExpresionOral: [CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO, Validators.required],
      tipo: [CONSTANTS.TIPO_POR_DEFECTO, Validators.required],
    })
  }

  private loadForm(idConvocatoria: number): void {
    this.loading = true;
    this.apiService.getConvocatoria(idConvocatoria).subscribe(convocatoria => {
      this.convocatoria = convocatoria
    })

    this.convocatoriaNuevaForm = this.formBuilder.group({
      activa: [CONSTANTS.ESTADO_POR_DEFECTO, Validators.required], //boolean;
      fechaParcial: [Date.now, Validators.required], // Date sin el horario
      horarioParcial: ['09:00', Validators.required],
      lenguaje: [CONSTANTS.LENGUAJE_POR_DEFECTO, Validators.required],
      pesomaximoParteComprensionAuditiva: [CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO, Validators.required],
      pesoMaximoParteComprensionLectora: [CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO, Validators.required],
      pesomaximoParteExpresionEscrita: [CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO, Validators.required],
      pesomaximoParteExpresionOral: [CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO, Validators.required],
      tipo: [CONSTANTS.TIPO_POR_DEFECTO, Validators.required],
    })
  }

  public saveConvocatoria(): void {
    this.loading = true
    if (this.convocatoriaNuevaForm.valid) {
      let fechaParcial: Date = this.convocatoriaNuevaForm.controls['fechaParcial'].value
      let horaParcial = this.convocatoriaNuevaForm.controls['horarioParcial'].value.split(':')
      fechaParcial.setHours(horaParcial[0])
      fechaParcial.setMinutes(horaParcial[1])
      this.convocatoria = new Convocatoria(fechaParcial, this.convocatoriaNuevaForm.value)
    }
    this.loading = false
  }
}
