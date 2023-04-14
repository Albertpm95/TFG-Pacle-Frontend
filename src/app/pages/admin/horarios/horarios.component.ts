import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Horario } from '@models/horario'
import { ApiService } from '@services/api.service'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss'],
})
export class HorariosComponent {
  nuevoHorarioForm = new FormControl()
  horarios: Horario[] = []

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private apiService: ApiService) {
    this.nuevoHorarioForm.setValidators(Validators.required)
    this.apiService
      .getHorariosConvocatoria()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Horario[]) => (this.horarios = response))
  }

  public deleteHorarioConvocatoria(idHorario: number) {
    idHorario
      ? this.apiService
          .deleteHorarioConvocatoria(idHorario)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            let indexAEliminar = this.horarios.findIndex(
              (horario) => horario.idHorario === idHorario,
            )
            if (indexAEliminar != -1)
              this.horarios.splice(
                this.horarios.findIndex(
                  (horario) => horario.idHorario === idHorario,
                ),
                1,
              )
          })
      : ''
  }

  public addHorarioConvocatoria() {
    if (this.nuevoHorarioForm.valid) {
      let lenguaje_nuevo: Horario = { horario: this.nuevoHorarioForm.value }
      this.apiService
        .addHorarioConvocatoria(lenguaje_nuevo)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: Horario) => {
          this.nuevoHorarioForm.reset()
          this.horarios.push(response)
        })
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }
}
