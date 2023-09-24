import { Component, Inject, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Alumno } from '@models/alumno'
import { ConvocatoriaDB } from '@models/convocatoria'
import { ApiService } from '@services/api.service'
import { Subject, finalize, take, takeUntil } from 'rxjs'

@Component({
  templateUrl: './convocatoria-alumno-selector.component.html',
  styleUrls: ['./convocatoria-alumno-selector.component.scss']
})
export class ConvocatoriaAlumnoSelectorDialogComponent implements OnInit {
  loading = true
  listConvocatorias: ConvocatoriaDB[] = []
  listAlumno: Alumno[] = []

  alumnoControl: FormControl = new FormControl()
  convocatoriaControl: FormControl = new FormControl()

  selectedAlumno: Alumno | undefined
  selectedConvocatoria: ConvocatoriaDB | undefined

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<ConvocatoriaAlumnoSelectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idConvocatoria: number; idAlumno: number }
  ) { }

  ngOnInit() {
    console.log(this.data)
    if (this.data.idAlumno && this.data.idConvocatoria) {
      this.close()
    } else if (this.data.idConvocatoria) {
      console.log(this.data.idConvocatoria)
      this.loadAlumnosConvocatoria(this.data.idConvocatoria)
    } else if (!this.data.idConvocatoria) {
      this.loadConvocatorias()
    }
  }

  private loadConvocatorias(): void {
    this.apiService
      .getConvocatorias()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false
        })
      )
      .subscribe((convocatorias: ConvocatoriaDB[]) => {
        this.listConvocatorias = convocatorias
        console.log(convocatorias)
      })
  }

  public selectConvocatoria(convocatoria: ConvocatoriaDB): void {
    console.log(convocatoria)
    this.selectedConvocatoria = convocatoria
    this.loadAlumnosConvocatoria(this.selectedConvocatoria.idConvocatoria)
  }

  private loadAlumnosConvocatoria(idConvocatoria: number): void {
    if (idConvocatoria)
      this.apiService
        .getAlumnosConvocatoria(idConvocatoria)
        .pipe(
          take(1),
          finalize(() => {
            this.loading = false
          })
        )
        .subscribe((alumnosConvocatoria: Alumno[]) => {
          this.listAlumno = alumnosConvocatoria
          console.log('Alunos convocatoria: ', alumnosConvocatoria)
        })
  }

  private close() {
    this.dialogRef.close()
  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }
}
