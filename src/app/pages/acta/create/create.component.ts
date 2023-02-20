import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ConvocatoriaNueva } from '@models/convocatoriaNueva'

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
  convocatoriaNueva: ConvocatoriaNueva = new ConvocatoriaNueva()
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
      lenguaje: [Constants.LENGUAJE_POR_DEFECTO, Validators.required], //'Español' | 'English' | 'Català' | 'Français' | 'Chainese' | 'Deutsch';
      tipo: [Constants.TIPO_POR_DEFECTO, Validators.required], //Ordinaria' | 'Extraordinaria';
      fechaParcial: [Date.now, Validators.required], //Date;
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
  public createActa(): void {
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
