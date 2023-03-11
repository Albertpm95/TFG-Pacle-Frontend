import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { COMPONENTS, CONSTANTS, MODULES } from '@constants';
import { Horario } from '@models/horario';
import { Lenguaje } from '@models/lenguaje';

import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent {
  constants = CONSTANTS
  convocatoriaNuevaForm: FormGroup = new FormGroup('')

  creating: boolean = true
  loading: boolean = true
  listaIdiomasConvocatoria$: Observable<Lenguaje[]> = this.apiService.getIdiomasConvocatoria()
  listaHorariosConvocatoria$: Observable<Horario[]> = this.apiService.getHorariosConvocatoria()
  list_route = '/' + MODULES.CONVOCATORIA + '/' + COMPONENTS.LIST

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activactedRoute: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    let idConvocatoria = this.activactedRoute.snapshot.params['id_convocatoria']

    idConvocatoria ? this.loadForm(idConvocatoria) : this.initializeForm()
  }

  private initializeForm(): void {
    this.convocatoriaNuevaForm = this.formBuilder.group({
      fechaParcial: [Date.now, Validators.required], // Date sin el horario
      horarioParcial: ['09:00', Validators.required],
      lenguaje: [CONSTANTS.LENGUAJE_POR_DEFECTO, Validators.required],
      pesomaximoParteComprensionAuditiva: [CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO, Validators.required],
      pesoMaximoParteComprensionLectora: [CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO, Validators.required],
      pesomaximoParteExpresionEscrita: [CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO, Validators.required],
      pesomaximoParteExpresionOral: [CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO, Validators.required],

    })
  }

  private loadForm(idConvocatoria: number): void {
    this.apiService.getConvocatoria(idConvocatoria).subscribe(convocatoria => {
      this.convocatoriaNuevaForm = this.formBuilder.group({
        fechaParcial: [convocatoria.fecha, Validators.required], // Date sin el horario
        horarioParcial: [convocatoria.horario.horario, Validators.required],
        lenguaje: [convocatoria.lenguaje.lenguaje, Validators.required],
        pesomaximoParteComprensionAuditiva: [convocatoria.comprension_auditiva_puntuacion_maxima_parte, Validators.required],
        pesoMaximoParteComprensionLectora: [convocatoria.comprension_lectora_puntuacion_maxima_parte, Validators.required],
        pesomaximoParteExpresionEscrita: [convocatoria.expresion_escrita_puntuacion_maxima_parte, Validators.required],
        pesomaximoParteExpresionOral: [convocatoria.expresion_oral_puntuacion_maxima_parte, Validators.required],
      })
      console.log(this.convocatoriaNuevaForm.value)
      this.creating = false
      this.loading = false
    })
  }

  public saveConvocatoria(): void {
    this.loading = true
    if (this.convocatoriaNuevaForm.valid) {
      let dateString = this.convocatoriaNuevaForm.controls['fechaParcial'].value
      let horaParcial = this.convocatoriaNuevaForm.controls['horarioParcial'].value.split(':')
      let fechaParcial = new Date(dateString)
      fechaParcial.setHours(horaParcial[0])
      fechaParcial.setMinutes(horaParcial[1])
      /*let convocatoria: Convocatoria
      this.apiService.updateConvocatoria(convocatoria).subscribe(convocatoria => {
        console.log(convocatoria)
        if (convocatoria.id_convocatoria)
          this.router.navigate([this.list_route])
      })
      */
    }
  }
}
