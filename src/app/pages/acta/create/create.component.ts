import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ConvocatoriaNueva } from '@models/convocatoriaNueva'

import { ApiService } from '@services/api.service'
import { Constants } from 'app/constants'

@Component({
  selector: 'app-acta',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateActaComponent {
  constants = Constants
  convocatoriaNuevaForm: FormGroup
  convocatoriaNueva: ConvocatoriaNueva = new ConvocatoriaNueva()
  loading: boolean = false
  listaIdiomasActa: string[] = []
  tiposActa: string[] = []
  horariosActa: string[] = []

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) {
    this.apiService.getIdiomasActa().subscribe((idiomas) => {
      this.listaIdiomasActa = idiomas
    })

    this.apiService.getTiposActa().subscribe((tipos) => {
      this.tiposActa = tipos
    })

    this.apiService.getHorariosActa().subscribe((horarios) => {
      this.horariosActa = horarios
    })

    this.convocatoriaNuevaForm = this.formBuilder.group({
      lenguaje: [Constants.LENGUAJE_POR_DEFECTO, Validators.required], //'Español' | 'English' | 'Català' | 'Français' | 'Chainese' | 'Deutsch';
      tipo: [Constants.TIPO_POR_DEFECTO, Validators.required], //Ordinaria' | 'Extraordinaria';
      fechaParcial: [Date.now, Validators.required], //Date;
      horarioParcial: [this.horariosActa[0], Validators.required],
      activa: [Constants.ESTADO_POR_DEFECTO, Validators.required], //boolean;
      pesoMaximoParteComprensionLectora: [
        Constants.VALOR_PUNTUACION_MAX_DEFECTO,
        Validators.required,
      ],
      pesomaximoParteExpresionEscrita: [
        Constants.VALOR_PUNTUACION_MAX_DEFECTO,
        Validators.required,
      ],
      pesomaximoParteComprensionAuditiva: [
        Constants.VALOR_PUNTUACION_MAX_DEFECTO,
        Validators.required,
      ],
      pesomaximoParteExpresionOral: [
        Constants.VALOR_PUNTUACION_MAX_DEFECTO,
        Validators.required,
      ],
    })
  }

  createActa() {
    this.loading = true
    if (this.convocatoriaNuevaForm.valid) {
      let fechaParcial: Date =
        this.convocatoriaNuevaForm.controls['fechaParcial'].value
      let horaParcial =
        this.convocatoriaNuevaForm.controls['horarioParcial'].value.split(':')
      fechaParcial.setHours(horaParcial[0])
      fechaParcial.setMinutes(horaParcial[1])
      this.convocatoriaNueva = new ConvocatoriaNueva(
        fechaParcial,
        this.convocatoriaNuevaForm.value,
      )
    }
    console.log(this.convocatoriaNueva)
    this.loading = false
  }
}
