import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { ColectivoUV } from '@models/colectivouv'
import { ApiService } from '@services/api.service'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-colectivouv',
  templateUrl: './colectivouv.component.html',
  styleUrls: ['./colectivouv.component.scss']
})
export class ColectivouvComponent {
  nuevoColectivoUVForm = new FormControl()
  colectivosUV: ColectivoUV[] = []

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private apiService: ApiService) {
    this.nuevoColectivoUVForm.setValidators(Validators.required)
    this.apiService
      .getColectivosUV()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: ColectivoUV[]) => {
        this.colectivosUV = response
      })
  }

  public deleteColectivoUV(idColectivoUV: number) {
    idColectivoUV
      ? this.apiService
          .deleteColectivoUV(idColectivoUV)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            let indexAEliminar = this.colectivosUV.findIndex((colectivo) => colectivo.idColectivoUV === idColectivoUV)
            if (indexAEliminar != -1)
              this.colectivosUV.splice(
                this.colectivosUV.findIndex((colectivo) => colectivo.idColectivoUV === idColectivoUV),
                1
              )
          })
      : ''
  }

  public addColectivoUV() {
    if (this.nuevoColectivoUVForm.valid) {
      let colectivoUV: ColectivoUV = {
        colectivoUV: this.nuevoColectivoUVForm.value
      }
      this.apiService
        .addColectivoUV(colectivoUV)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: ColectivoUV) => {
          this.nuevoColectivoUVForm.reset()
          this.colectivosUV.push(response)
        })
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }
}
