import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { COMPONENTS, MODULES } from '@constants'
import { ConvocatoriaDB } from '@models/convocatoria'
import { ApiService } from '@services/api.service'
import { Observable, Subject, catchError, finalize, takeUntil, throwError, throwIfEmpty } from 'rxjs'

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  displayed_columns: string[] = [
    'idConvocatoria',
    'lenguaje',
    'nivel',
    'fecha',
    'horario',
    'estado',
    'maxComprensionAuditiva',
    'maxComprensionLectora',
    'maxExpresionEscrita',
    'maxExpresionOral',
    'acciones'
  ]
  data_source: MatTableDataSource<ConvocatoriaDB> = new MatTableDataSource()

  loading = true
  edit_route = '/' + MODULES.CONVOCATORIA + '/' + COMPONENTS.EDITION
  alumno_list_route = '/' + MODULES.ALUMNO + '/' + COMPONENTS.LIST

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.initializeList()
  }
  private initializeList(): void {
    this.apiService
      .getConvocatorias()
      .pipe(
        takeUntil(this.destroy$),

        finalize(() => {
          this.loading = false
        })
      )
      .subscribe((convocatorias) => {
        if (convocatorias) {
          this.data_source = new MatTableDataSource(convocatorias)
          console.log(this.data_source.filteredData.length)
          this.loading = false
        }
      })
  }
  public cambiarEstadoConvocatoria(convocatoria: ConvocatoriaDB): void {
    if (convocatoria.idConvocatoria)
      this.apiService.cambiarEstadoConvocatoria(convocatoria.idConvocatoria, !convocatoria.estado).pipe(
        takeUntil(this.destroy$),

        finalize(() => {
          this.loading = false
        }),
        throwIfEmpty(() => {
          console.log('Vacio')
        })
      )
  }

  public deleteConvocatoria(idConvocatoria: number): void {
    this.apiService.deleteConvocatoria(idConvocatoria).pipe(takeUntil(this.destroy$)).subscribe()
  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }
}
