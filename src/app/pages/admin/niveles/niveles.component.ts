import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Nivel } from '@models/nivel'
import { ApiService } from '@services/api.service'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styleUrls: ['./niveles.component.scss'],
})
export class NivelesComponent {
  nuevoNivelForm = new FormControl()
  niveles: Nivel[] = []

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private apiService: ApiService) {
    this.nuevoNivelForm.setValidators(Validators.required)
    this.apiService
      .getNivelesConvocatoria()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Nivel[]) => (this.niveles = response))
  }

  public deleteNivelConvocatoria(idNivel: number) {
    idNivel
      ? this.apiService
          .deleteNivelConvocatoria(idNivel)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            let indexAEliminar = this.niveles.findIndex(
              (nivel) => nivel.idNivel === idNivel,
            )
            if (indexAEliminar != -1)
              this.niveles.splice(
                this.niveles.findIndex((nivel) => nivel.idNivel === idNivel),
                1,
              )
          })
      : ''
  }

  public addNivelConvocatoria() {
    if (this.nuevoNivelForm.valid) {
      let lenguaje_nuevo: Nivel = { nivel: this.nuevoNivelForm.value }
      this.apiService
        .addNivelConvocatoria(lenguaje_nuevo)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: Nivel) => {
          this.nuevoNivelForm.reset()
          this.niveles.push(response)
        })
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }
}
