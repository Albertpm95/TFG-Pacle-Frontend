import { Component, Inject, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Alumno } from '@models/alumno'
import { ConvocatoriaDB } from '@models/convocatoria'
import { AlumnosConvocatoria } from '@models/dictionaries'
import { ApiService } from '@services/api.service'
import { Subject, finalize, takeUntil } from 'rxjs'

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
        finalize(() => {
          this.loading = false
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
        finalize(() => {
          this.loading = false
        })
      )
      .subscribe((convocatorias: ConvocatoriaDB[]) => {
        this.listConvocatorias = convocatorias
      })
  }
  private close() {
    this.dialogRef.close()
  }
}
