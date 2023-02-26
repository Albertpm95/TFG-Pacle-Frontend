import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Convocatoria } from '@models/convocatoria'

import { ApiService } from '@services/api.service'
import { Constants } from 'app/constants'
import { Observable } from 'rxjs/internal/Observable'

@Component({
  selector: 'app-acta',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateActaComponent {
  constants = Constants
  convocatoriaNuevaForm: FormGroup = new FormGroup({})
  convocatoriaNueva: Convocatoria = new Convocatoria()
  loading: boolean = false
  listaIdiomasActa$: Observable<string[]> = this.apiService.getIdiomasActa()
  tiposActa$: Observable<string[]> = this.apiService.getTiposActa()
  horariosActa$: Observable<string[]> = this.apiService.getHorariosActa()

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) {

  }
  ngOnInit(): void { this.initializeForm() }

  private initializeForm(): void {
    this.convocatoriaNuevaForm = this.formBuilder.group({
      lenguaje: [Constants.LENGUAJE_POR_DEFECTO, Validators.required],
      tipo: [Constants.TIPO_POR_DEFECTO, Validators.required],
      fechaParcial: [Date.now, Validators.required], // Date sin el horario
      horarioParcial: ['', Validators.required],
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
  public createConvocatoria(): void {
    this.loading = true
    if (this.convocatoriaNuevaForm.valid) {
      let fechaParcial: Date =
        this.convocatoriaNuevaForm.controls['fechaParcial'].value
      let horaParcial =
        this.convocatoriaNuevaForm.controls['horarioParcial'].value.split(':')
      fechaParcial.setHours(horaParcial[0])
      fechaParcial.setMinutes(horaParcial[1])
      this.convocatoriaNueva = new Convocatoria(
        fechaParcial,
        this.convocatoriaNuevaForm.value,
      )
    }
    console.log('Creando convocatoria: ', this.convocatoriaNueva)
    this.loading = false
  }
}
