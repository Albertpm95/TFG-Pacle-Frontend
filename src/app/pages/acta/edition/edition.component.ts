import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { ActaDB, ActaNueva } from '@models/acta'
import { Alumno } from '@models/alumno'
import { ConvocatoriaDB } from '@models/convocatoria'
import { Tarea, TareaCorregida } from '@models/correccion'
import { Usuario } from '@models/usuario'
import { ApiService } from '@services/api.service'
import { ConvocatoriaAlumnoSelectorDialogComponent } from 'app/components/dialogs/convocatoria-alumno-selector/convocatoria-alumno-selector.component'
import { Observable, Subject, catchError, finalize, takeUntil, throwError, throwIfEmpty } from 'rxjs'

@Component({
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent implements OnInit, OnDestroy {
  loading = true
  acta: Partial<ActaNueva> | Partial<ActaDB> | undefined
  alumno: Alumno | undefined
  convocatoria: ConvocatoriaDB | undefined
  usuario: Usuario | undefined

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private apiService: ApiService, private activactedRoute: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadOwnUser()
    const idActa: number | undefined = this.activactedRoute.snapshot.params['idActa']
    const idAlumno: number | undefined = this.activactedRoute.snapshot.params['idAlumno']
    const idConvocatoria: number | undefined = this.activactedRoute.snapshot.params['idConvocatoria']
    if (idActa) this.loadActa(idActa)
    else if (idAlumno && idConvocatoria) this.createActaVacia(idAlumno, idConvocatoria)
    else this.selectAlumnoConvocatoria(idConvocatoria, idAlumno)
  }

  private loadActa(idActa: number) {
    this.apiService
      .getActaID(idActa)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false
        })
      )
      .subscribe((acta: ActaDB) => {
        this.acta = acta
      })
  }

  private createActaVacia(idAlumno: number, idConvocatoria: number): void {
    this.loadAlumno(idAlumno)
    if (this.alumno) this.loadConvocatoria(idConvocatoria)
    if (this.alumno && this.convocatoria && this.usuario) {
      const newActa: ActaNueva = {
        alumno: this.alumno,
        convocatoria: this.convocatoria,
        resultado: '',
        corrector: this.usuario,
        resultadoDestrezasOrales: 0,
        resultadoGlobal: 0,
        resultadoLectoEscritura: 0,
        comprensionAuditiva: {
          parte: this.convocatoria.parteComprensionAuditiva,
          puntosConseguidos: 0,
          observaciones: '',
          porcentaje: 0,
          correccion: {
            tareasCorregidas: this.initializeTareasCorregidasFromTareas(
              this.convocatoria.parteComprensionAuditiva.tareas
            ),
            corrector: this.usuario
          }
        },
        comprensionLectora: {
          parte: this.convocatoria.parteComprensionLectora,
          puntosConseguidos: 0,
          observaciones: '',
          porcentaje: 0,
          correccion: {
            tareasCorregidas: this.initializeTareasCorregidasFromTareas(
              this.convocatoria.parteComprensionLectora.tareas
            ),
            corrector: this.usuario
          }
        },
        expresionEscrita: {
          parte: this.convocatoria.parteExpresionEscrita,
          puntosConseguidos: 0,
          observaciones: '',
          porcentaje: 0,
          correccion: {
            tareasCorregidas: this.initializeTareasCorregidasFromTareas(this.convocatoria.parteExpresionEscrita.tareas),
            corrector: this.usuario
          },
          correccion2: {
            tareasCorregidas: this.initializeTareasCorregidasFromTareas(this.convocatoria.parteExpresionEscrita.tareas),
            corrector: this.usuario
          }
        },
        expresionOral: {
          parte: this.convocatoria.parteExpresionOral,
          puntosConseguidos: 0,
          observaciones: '',
          porcentaje: 0,
          correccion: {
            tareasCorregidas: this.initializeTareasCorregidasFromTareas(this.convocatoria.parteExpresionOral.tareas),
            corrector: this.usuario
          },
          correccion2: {
            tareasCorregidas: this.initializeTareasCorregidasFromTareas(this.convocatoria.parteExpresionOral.tareas),
            corrector: this.usuario
          }
        }
      }
      this.acta = newActa
    }
  }

  private selectAlumnoConvocatoria(idConvocatoria?: number, idAlumno?: number): void {
    const dialogRef = this.dialog.open(ConvocatoriaAlumnoSelectorDialogComponent, {
      data: { idAlumno: idAlumno, idConvocatoria: idConvocatoria }
    })

    dialogRef.afterClosed().subscribe()
  }

  private loadOwnUser(): void {
    this.apiService.getUsuarioActual().subscribe((usuarioActual: Usuario) => {
      this.usuario = usuarioActual
    })
  }

  private initializeTareasCorregidasFromTareas(tareas: Tarea[]): TareaCorregida[] {
    const tareasCorregidas: TareaCorregida[] = []
    tareas.forEach((tarea: Tarea) => {
      const tareaCorregida: TareaCorregida = new TareaCorregida(tarea, 0)
      tareasCorregidas.push(tareaCorregida)
    })
    return tareasCorregidas
  }

  private loadAlumno(idAlumno: number): void {
    this.apiService
      .getAlumnoID(idAlumno)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error): Observable<never> => {
          console.error('Error fetching data from api:', error)
          return throwError(() => error)
        }),
        finalize(() => {
          this.loading = false
        }),
        throwIfEmpty(() => {
          console.log('Vacio')
        })
      )
      .subscribe((alumno: Alumno) => {
        this.alumno = alumno
      })
  }

  private loadConvocatoria(idConvocatoria: number): void {
    this.apiService.getConvocatoriaID(idConvocatoria).pipe(
      takeUntil(this.destroy$),
      catchError((error): Observable<never> => {
        console.error('Error fetching data from api:', error)
        return throwError(() => error)
      }),
      finalize(() => {
        this.loading = false
      }),
      throwIfEmpty(() => {
        console.log('Vacio')
      })
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
  }
}
