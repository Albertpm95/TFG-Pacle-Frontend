import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { COMPONENTS, CONSTANTS, MODULES } from '@constants';
import { Genero } from '@models/genero';
import { Horario } from '@models/horario';
import { Lenguaje } from '@models/lenguaje';
import { Nivel } from '@models/nivel';

import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent {
  constants = CONSTANTS
  convocatoriaForm: FormGroup = new FormGroup('')

  creating: boolean = true
  loading: boolean = true
  listaLenguajesConvocatoria$: Observable<Lenguaje[]> = this.apiService.getLenguajesConvocatoria()
  listaHorariosConvocatoria$: Observable<Horario[]> = this.apiService.getHorariosConvocatoria()
  listaNivelesConvocatoria$: Observable<Nivel[]> = this.apiService.getNivelesConvocatoria()
  listaGenerosConvocatoria$: Observable<Genero[]> = this.apiService.getGenerosConvocatoria()
  listRoute = '/' + MODULES.CONVOCATORIA + '/' + COMPONENTS.LIST

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private activactedRoute: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    let idConvocatoria = this.activactedRoute.snapshot.params['idConvocatoria']

    idConvocatoria ? this.loadForm(idConvocatoria) : this.initializeForm()
  }

  private initializeForm(): void {
    this.convocatoriaForm = this.formBuilder.group({
      fechaParcial: [Date.now, Validators.required], // Date sin el horario
      horarioParcial: ['', Validators.required],
      lenguaje: ['', Validators.required],
      nivel: ['', Validators.required],
      genero: ['', Validators.required],
      maxComprensionAuditiva: [CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO, Validators.required],
      maxComprensionLectora: [CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO, Validators.required],
      maxExpresionEscrita: [CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO, Validators.required],
      maxExpresionOral: [CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO, Validators.required],

    })
  }

  private loadForm(idConvocatoria: number): void {
    this.apiService.getConvocatoria(idConvocatoria).subscribe(convocatoria => {
      this.convocatoriaForm = this.formBuilder.group({
        fecha_parcial: [convocatoria.fecha, Validators.required], // Date sin el horario
        horario_parcial: [convocatoria.horario.horario, Validators.required],
        lenguaje: [convocatoria.lenguaje.lenguaje, Validators.required],
        maxComprensionAuditiva: [convocatoria.maxComprensionAuditiva, Validators.required],
        maxComprensionLectora: [convocatoria.maxComprensionLectora, Validators.required],
        maxExpresionEscrita: [convocatoria.maxExpresionEscrita, Validators.required],
        maxExpresionOral: [convocatoria.maxExpresion_oral, Validators.required],
      })
      console.log(this.convocatoriaForm.value)
      this.creating = false
      this.loading = false
    })
  }

  public saveConvocatoria(): void {
    this.loading = true
    if (this.convocatoriaForm.valid) {
      let date_string = this.convocatoriaForm.controls['fecha_parcial'].value
      let hora_parcial = this.convocatoriaForm.controls['horario_parcial'].value.split(':')
      let fecha_parcial = new Date(date_string)
      fecha_parcial.setHours(hora_parcial[0])
      fecha_parcial.setMinutes(hora_parcial[1])
      /*let convocatoria: Convocatoria
      this.apiService.updateConvocatoria(convocatoria).subscribe(convocatoria => {
        console.log(convocatoria)
        if (convocatoria.idConvocatoria)
          this.router.navigate([this.listRoute])
      })
      */
    }
  }
}
