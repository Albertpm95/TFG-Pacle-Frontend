import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Acta } from '@models/acta'
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
  actaForm: FormGroup
  acta: Acta = new Acta()
  loading: boolean = false
  listaIdiomasActa: string[] = []
  tiposActa: string[] = []

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) {
    this.actaForm = this.formBuilder.group({
      lenguaje: [Constants.LENGUAJE_POR_DEFECTO, Validators.required], //'Español' | 'English' | 'Català' | 'Français' | 'Chainese' | 'Deutsch';
      tipo: [Constants.TIPO_POR_DEFECTO, Validators.required], //Ordinaria' | 'Extraordinaria';
      fecha: [Date.now, Validators.required], //Date;
      hora: [Date.now, Validators.required],
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

    this.apiService.getIdiomasActa().subscribe((idiomas) => {
      this.listaIdiomasActa = idiomas
    })

    this.apiService.getTiposActa().subscribe((tipos) => {
      this.tiposActa = tipos
    })
  }

  createActa() {
    this.loading = true
    console.log(this.actaForm.value)
    if (this.actaForm.valid) {
      this.acta.lenguaje = this.actaForm.controls['lenguaje'].value
      this.acta.tipo = this.actaForm.controls['tipo'].value
      let fecha: Date = this.actaForm.controls['fecha'].value
      let hora = this.actaForm.controls['hora'].value.split(':')
      fecha.setHours(hora[0])
      fecha.setMinutes(hora[1])
      this.acta.fecha = fecha
      this.acta.estado = true
    }
    console.log(this.acta)
    this.loading = false
  }
}
