import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Lenguaje } from '@models/lenguaje'
import { ApiService } from '@services/api.service'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-lenguajes',
  templateUrl: './lenguajes.component.html',
  styleUrls: ['./lenguajes.component.scss'],
})
export class LenguajesComponent {
  nuevoLenguajeForm = new FormControl()
  lenguajes: Lenguaje[] = []

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private apiService: ApiService) {
    this.nuevoLenguajeForm.setValidators(Validators.required)
    this.apiService
      .getLenguajesConvocatoria()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Lenguaje[]) => (this.lenguajes = response))
  }

  public deleteLenguajeConvocatoria(idLenguaje: number) {
    idLenguaje
      ? this.apiService
          .deleteLenguajeConvocatoria(idLenguaje)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            let indexAEliminar = this.lenguajes.findIndex(
              (lLenguaje) => lLenguaje.idLenguaje === idLenguaje,
            )
            if (indexAEliminar != -1)
              this.lenguajes.splice(
                this.lenguajes.findIndex(
                  (lLenguaje) => lLenguaje.idLenguaje === idLenguaje,
                ),
                1,
              )
          })
      : ''
  }

  public addLenguajeConvocatoria() {
    if (this.nuevoLenguajeForm.valid) {
      let lenguaje_nuevo: Lenguaje = { lenguaje: this.nuevoLenguajeForm.value }
      this.apiService
        .addLenguajeConvocatoria(lenguaje_nuevo)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: Lenguaje) => {
          this.nuevoLenguajeForm.reset()
          this.lenguajes.push(response)
        })
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }
}
