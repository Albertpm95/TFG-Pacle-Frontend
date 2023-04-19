import { Component, Inject } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Alumno } from '@models/alumno'
import { Convocatoria } from '@models/convocatoria'
import { AlumnosConvocatoria } from '@models/dictionaries'
import { ApiService } from '@services/api.service'
import { Subject, takeUntil, catchError, Observable, throwError, finalize, throwIfEmpty } from 'rxjs'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  templateUrl: './convocatoria-alumno-selector.component.html',
  styleUrls: ['./convocatoria-alumno-selector.component.scss']
})
export class ConvocatoriaAlumnoSelectorDialog {
  loading: boolean = true
  listConvocatorias: Convocatoria[] = []
  listAlumno: Alumno[] = []

  alumnoControl: FormControl = new FormControl()
  convocatoriaControl: FormControl = new FormControl()

  selectedAlumno: Alumno | undefined
  selectedConvocatoria: Convocatoria | undefined

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<ConvocatoriaAlumnoSelectorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { idConvocatoria: number; idAlumno: number }
  ) {}

  ngOnInit() {
    if (this.data.idAlumno && this.data.idConvocatoria) {
      this.close()
    } else if (this.data.idConvocatoria) {
      this.loadAlumnosConvocatoria(this.data.idConvocatoria)
    } else if (!this.data.idConvocatoria) {
      this.loadConvocatorias()
      this.convocatoriaControl.valueChanges.subscribe((convocatoria) => {
        this.loadAlumnosConvocatoria(convocatoria.idConvocatoria)
      })
    }
  }

  private loadAlumnosConvocatoria(idConvocatoria: number): void {
    this.apiService
      .getAlumnosConvocatoria(idConvocatoria)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error): Observable<never> => {
          console.error('Error fetching data from api:', error)
          return throwError(() => error)
        }),
        finalize(() => {
          console.log('Finalizado')
          this.loading = false
        }),
        throwIfEmpty(() => {
          console.log('Vacio')
        })
      )
      .subscribe((alumnosConvocatoria: AlumnosConvocatoria) => {
        this.listAlumno = alumnosConvocatoria.alumnos
        this.selectedConvocatoria = alumnosConvocatoria.convocatoria
      })
  }

  private loadConvocatorias(): void {
    this.apiService
      .getConvocatorias()
      .pipe(
        takeUntil(this.destroy$),
        catchError((error): Observable<never> => {
          console.error('Error fetching data from api:', error)
          return throwError(() => error)
        }),
        finalize(() => {
          console.log('Finalizado')
          this.loading = false
        }),
        throwIfEmpty(() => {
          console.log('Vacio')
        })
      )
      .subscribe((convocatorias: Convocatoria[]) => {
        this.listConvocatorias = convocatorias
      })
  }
  private close() {
    this.dialogRef.close()
  }
}
