import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Genero } from '@models/genero'
import { ApiService } from '@services/api.service'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.scss'],
})
export class GenerosComponent {
  nuevoGeneroForm = new FormControl()
  generos: Genero[] = []

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private apiService: ApiService) {
    this.nuevoGeneroForm.setValidators(Validators.required)
    this.apiService
      .getGenerosAlumno()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Genero[]) => (this.generos = response))
  }

  public deleteGeneroAlumno(idGenero: number) {
    idGenero
      ? this.apiService
          .deleteGeneroAlumno(idGenero)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            let indexAEliminar = this.generos.findIndex(
              (genero) => genero.idGenero === idGenero,
            )
            if (indexAEliminar != -1)
              this.generos.splice(
                this.generos.findIndex(
                  (genero) => genero.idGenero === idGenero,
                ),
                1,
              )
          })
      : ''
  }

  public addGeneroAlumno() {
    if (this.nuevoGeneroForm.valid) {
      let lenguaje_nuevo: Genero = { genero: this.nuevoGeneroForm.value }
      this.apiService
        .addGeneroAlumno(lenguaje_nuevo)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: Genero) => {
          this.nuevoGeneroForm.reset()
          this.generos.push(response)
        })
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }
}
