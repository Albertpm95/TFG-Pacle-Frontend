import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Constants } from '@constants'
import { Acta } from '@models/acta'
import { ApiService } from '@services/api.service'

@Component({
  selector: 'app-correct',
  templateUrl: './correct.component.html',
  styleUrls: ['./correct.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorrectActaComponent {
  comprensionLectoraForm: FormGroup
  comprensionAuditivaForm!: FormGroup
  expresionEscritaForm!: FormGroup
  expresionOralForm!: FormGroup
  acta: Acta = new Acta()
  loadingActa: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) {
    this.comprensionLectoraForm = this.formBuilder.group({
      puntuacion_tarea1: [Constants.VALOR_TAREA_DEFECTO, Validators.required],
      puntuacion_tarea2: [Constants.VALOR_TAREA_DEFECTO, Validators.required],
      puntuacion_tarea3: [Constants.VALOR_TAREA_DEFECTO, Validators.required],
      porcentaje: [Constants.VALOR_TAREA_DEFECTO],
      puntuacionMaximaParte: [Constants.VALOR_TAREA_DEFECTO, ,],
      puntosConseguidos: [Constants.VALOR_TAREA_DEFECTO],
      observaciones: [''],
    })

    this.apiService.getActa('1').subscribe((acta) => {
      this.acta = acta
      this.comprensionLectoraForm = this.formBuilder.group({
        puntuacion_tarea1: [
          this.acta.comprensionLectora.puntuacion_tarea1,
          Validators.required,
        ],
        puntuacion_tarea2: [
          this.acta.comprensionLectora.puntuacion_tarea2,
          Validators.required,
        ],
        puntuacion_tarea3: [
          this.acta.comprensionLectora.puntuacion_tarea3,
          Validators.required,
        ],
        porcentaje: [this.acta.comprensionLectora.calcularPorcentaje],
        puntuacionMaximaParte: [
          this.acta.comprensionLectora.puntuacionMaximaParte,
        ],
        puntosConseguidos: [
          this.acta.comprensionLectora.calcularPuntosConseguidos,
        ],
        observaciones: [this.acta.comprensionLectora.observaciones],
      })

      this.comprensionAuditivaForm = this.formBuilder.nonNullable.group({
        puntuacion_tarea1: [
          this.acta.comprensionAuditiva.puntuacion_tarea1,
          Validators.required,
        ],
        puntuacion_tarea2: [
          this.acta.comprensionAuditiva.puntuacion_tarea2,
          Validators.required,
        ],
        puntuacion_tarea3: [
          this.acta.comprensionAuditiva.puntuacion_tarea3,
          Validators.required,
        ],
        porcentaje: [this.acta.comprensionAuditiva.calcularPorcentaje],
        puntuacionMaximaParte: [
          this.acta.comprensionAuditiva.puntuacionMaximaParte,
        ],
        puntosConseguidos: [
          this.acta.comprensionAuditiva.calcularPuntosConseguidos,
        ],
        observaciones: [this.acta.comprensionAuditiva.observaciones],
      })
      this.expresionEscritaForm = this.formBuilder.nonNullable.group({
        tarea1: {
          alcance: [
            this.acta.expresionOral.tarea1.alcance,
            Validators.required,
          ],
          coherencia: [
            this.acta.expresionOral.tarea1.coherencia,
            Validators.required,
          ],
          correccion: [
            this.acta.expresionOral.tarea1.correccion,
            Validators.required,
          ],
          eficienciaC: [
            this.acta.expresionOral.tarea1.eficaciaC,
            Validators.required,
          ],
          nombre_corrector: [
            this.acta.expresionOral.tarea1.nombre_corrector,
            Validators.required,
          ],
        },
        tarea2: {
          alcance: [
            this.acta.expresionOral.tarea2.alcance,
            Validators.required,
          ],
          coherencia: [
            this.acta.expresionOral.tarea2.coherencia,
            Validators.required,
          ],
          correccion: [
            this.acta.expresionOral.tarea2.correccion,
            Validators.required,
          ],
          eficienciaC: [
            this.acta.expresionOral.tarea2.eficaciaC,
            Validators.required,
          ],
          nombre_corrector: [
            this.acta.expresionOral.tarea2.nombre_corrector,
            Validators.required,
          ],
        },
        observaciones: [this.acta.expresionOral.observaciones],
        porcentaje: [this.acta.expresionOral.calcularPorcentaje],
        puntuacionMaximaParte: [this.acta.expresionOral.puntuacionMaximaParte],
        puntosConseguidos: [this.acta.expresionOral.calcularPuntosConseguidos],
      })
      this.comprensionLectoraForm = this.formBuilder.nonNullable.group({
        tarea1: {
          alcance: [
            this.acta.expresionEscrita.tarea1.alcance,
            Validators.required,
          ],
          coherencia: [
            this.acta.expresionEscrita.tarea1.coherencia,
            Validators.required,
          ],
          correccion: [
            this.acta.expresionEscrita.tarea1.correccion,
            Validators.required,
          ],
          eficienciaC: [
            this.acta.expresionEscrita.tarea1.eficaciaC,
            Validators.required,
          ],
          nombre_corrector: [
            this.acta.expresionEscrita.tarea1.nombre_corrector,
            Validators.required,
          ],
        },
        tarea2: {
          alcance: [
            this.acta.expresionEscrita.tarea2.alcance,
            Validators.required,
          ],
          coherencia: [
            this.acta.expresionEscrita.tarea2.coherencia,
            Validators.required,
          ],
          correccion: [
            this.acta.expresionEscrita.tarea2.correccion,
            Validators.required,
          ],
          eficienciaC: [
            this.acta.expresionEscrita.tarea2.eficaciaC,
            Validators.required,
          ],
          nombre_corrector: [
            this.acta.expresionEscrita.tarea2.nombre_corrector,
            Validators.required,
          ],
        },
        observaciones: [this.acta.expresionEscrita.observaciones],
        porcentaje: [this.acta.expresionEscrita.calcularPorcentaje],
        puntuacionMaximaParte: [
          this.acta.expresionEscrita.puntuacionMaximaParte,
        ],
        puntosConseguidos: [
          this.acta.expresionEscrita.calcularPuntosConseguidos,
        ],
      })

      this.loadingActa = true
    })
  }
  corregirActa() {}
}
