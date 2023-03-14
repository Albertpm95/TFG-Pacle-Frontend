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
  convocatoria_form: FormGroup = new FormGroup('')

  creating: boolean = true
  loading: boolean = true
  lista_idiomas_convocatoria$: Observable<Lenguaje[]> = this.apiService.getIdiomasConvocatoria()
  lista_horarios_convocatoria$: Observable<Horario[]> = this.apiService.getHorariosConvocatoria()
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
    this.convocatoria_form = this.formBuilder.group({
      fecha_parcial: [Date.now, Validators.required], // Date sin el horario
      horario_parcial: ['09:00', Validators.required],
      lenguaje: [CONSTANTS.LENGUAJE_POR_DEFECTO, Validators.required],
      maximo_comprension_auditiva: [CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO, Validators.required],
      maximo_comprension_lectora: [CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO, Validators.required],
      maximo_expresion_escrita: [CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO, Validators.required],
      maximo_expresion_oral: [CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO, Validators.required],

    })
  }

  private loadForm(idConvocatoria: number): void {
    this.apiService.getConvocatoria(idConvocatoria).subscribe(convocatoria => {
      this.convocatoria_form = this.formBuilder.group({
        fecha_parcial: [convocatoria.fecha, Validators.required], // Date sin el horario
        horario_parcial: [convocatoria.horario.horario, Validators.required],
        lenguaje: [convocatoria.lenguaje.lenguaje, Validators.required],
        maximo_comprension_auditiva: [convocatoria.maximo_comprension_auditiva, Validators.required],
        maximo_comprension_lectora: [convocatoria.maximo_comprension_lectora, Validators.required],
        maximo_expresion_escrita: [convocatoria.maximo_expresion_escrita, Validators.required],
        maximo_expresion_oral: [convocatoria.maximo_expresion_oral, Validators.required],
      })
      console.log(this.convocatoria_form.value)
      this.creating = false
      this.loading = false
    })
  }

  public saveConvocatoria(): void {
    this.loading = true
    if (this.convocatoria_form.valid) {
      let date_string = this.convocatoria_form.controls['fecha_parcial'].value
      let hora_parcial = this.convocatoria_form.controls['horario_parcial'].value.split(':')
      let fecha_parcial = new Date(date_string)
      fecha_parcial.setHours(hora_parcial[0])
      fecha_parcial.setMinutes(hora_parcial[1])
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
