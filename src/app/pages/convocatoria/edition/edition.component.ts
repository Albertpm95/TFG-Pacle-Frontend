import { Component } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { COMPONENTS, CONSTANTS, MODULES } from '@constants'
import { Convocatoria } from '@models/convocatoria'
import { Horario } from '@models/horario'
import { Lenguaje } from '@models/lenguaje'
import { Nivel } from '@models/nivel'
import { Parte } from '@models/parte'
import { ApiService } from '@services/api.service'
import { Observable, Subject, catchError, finalize, takeUntil, throwError, throwIfEmpty } from 'rxjs'

@Component({
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent {
  convocatoriaForm: FormGroup = new FormGroup('')

  convocatoria: Convocatoria | undefined
  loading: boolean = true

  listaLenguajesConvocatoria$: Observable<Lenguaje[]> = this.apiService.getLenguajesConvocatoria()
  listaHorariosConvocatoria$: Observable<Horario[]> = this.apiService.getHorariosConvocatoria()
  listaNivelesConvocatoria$: Observable<Nivel[]> = this.apiService.getNivelesConvocatoria()

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private activactedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activactedRoute.snapshot.params['idConvocatoria']
      ? this.loadForm(this.activactedRoute.snapshot.params['idConvocatoria'])
      : this.initializeNewForm()
  }

  private initializeNewForm(): void {
    this.convocatoriaForm = this.formBuilder.group({
      estado: [true],
      fechaParcial: [Date.now, Validators.required], // Date sin el horario
      horario: ['', Validators.required],
      lenguaje: ['', Validators.required],
      nivel: ['', Validators.required],
      specificIdentifier: [''],
      comprensionAuditiva: this.formBuilder.group({
        puntuacionMaxima: [0, Validators.required],
        listaTareas: this.formBuilder.array([])
      }),
      comprensionLectora: this.formBuilder.group({
        puntuacionMaxima: [0, Validators.required],
        listaTareas: this.formBuilder.array([])
      }),
      expresionEscrita: this.formBuilder.group({
        puntuacionMaxima: [0, Validators.required],
        listaTareas: this.formBuilder.array([])
      }),
      expresionOral: this.formBuilder.group({
        puntuacionMaxima: [0, Validators.required],
        listaTareas: this.formBuilder.array([])
      })
    })
    this.loading = false
  }

  private loadForm(idConvocatoria: number): void {
    this.apiService
      .getConvocatoriaID(idConvocatoria)
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
      .subscribe((convocatoria) => {
        this.convocatoriaForm = this.formBuilder.group({
          estado: [convocatoria.estado],
          fechaParcial: [convocatoria.fecha, Validators.required], // Date sin el horario
          horario: [convocatoria.horario, Validators.required],
          lenguaje: [convocatoria.lenguaje, Validators.required],
          nivel: [convocatoria.nivel, Validators.required],
          comprensionAuditiva: this.formBuilder.group({
            puntuacionMaxima: [convocatoria.comprensionAuditiva.puntuacionMaxima, Validators.required],
            listaTareas: this.formBuilder.array([])
          }),
          comprensionLectora: this.formBuilder.group({
            puntuacionMaxima: [convocatoria.comprensionLectora.puntuacionMaxima, Validators.required],
            listaTareas: this.formBuilder.array([])
          }),
          expresionEscrita: this.formBuilder.group({
            puntuacionMaxima: [convocatoria.expresionEscrita.puntuacionMaxima, Validators.required],
            listaTareas: this.formBuilder.array([])
          }),
          expresionOral: this.formBuilder.group({
            puntuacionMaxima: [convocatoria.expresionOral.puntuacionMaxima, Validators.required],
            listaTareas: this.formBuilder.array([])
          })
        })
        this.loading = false
      })
  }

  public saveConvocatoria(idConvocatoria?: number): void {
    this.loading = true
    if (this.convocatoriaForm.valid) {
      let convocatoria: Convocatoria = this.extractConvocatoriaForm()
      idConvocatoria ? this.updateConvocatoriaAPI(convocatoria) : this.createConvocatoriaAPI(convocatoria)
    } else {
      this.loading = false
    }
  }

  public get listaTareasComprensionAuditiva() {
    return this.convocatoriaForm.get('comprensionAuditiva')?.get('listaTareas') as FormArray
  }
  public get listaTareasComprensionLectora() {
    return this.convocatoriaForm.get('comprensionLectora')?.get('listaTareas') as FormArray
  }
  public get listaTareasExpresionEscrita() {
    return this.convocatoriaForm.get('expresionEscrita')?.get('listaTareas') as FormArray
  }
  public get listaTareasExpresionOral() {
    return this.convocatoriaForm.get('expresionOral')?.get('listaTareas') as FormArray
  }
  private extractFecha(): Date {
    let date_string = this.convocatoriaForm.controls['fechaParcial'].value
    let hora_parcial = this.convocatoriaForm.controls['horario'].value.split(':')
    let fechaParcial = new Date(date_string)
    fechaParcial.setHours(hora_parcial[0])
    fechaParcial.setMinutes(hora_parcial[1])

    return fechaParcial
  }

  private extractConvocatoriaForm(): Convocatoria {
    let convocatoria: Convocatoria = {
      estado: this.convocatoriaForm.controls['estado'].value,
      horario: this.convocatoriaForm.controls['horario'].value,
      lenguaje: this.convocatoriaForm.controls['lenguaje'].value,
      nivel: this.convocatoriaForm.controls['nivel'].value,
      fecha: this.extractFecha(),
      idConvocatoria: this.convocatoria?.idConvocatoria,
      comprensionAuditiva: this.extractParte('comprensionAuditiva', 'Comprension Auditiva'),
      comprensionLectora: this.extractParte('comprensionLectora', 'Comprension Lectora'),
      expresionEscrita: this.extractParte('expresionEscrita', 'Expresion Escrita'),
      expresionOral: this.extractParte('expresionOral', 'Expresion Oral'),
      specificIdentifier: this.convocatoriaForm.controls['specificIdentifier'].value
    }

    return convocatoria
  }

  private extractParte(label: string, tipo: string): Parte {
    let parte: Parte = {
      puntuacionMaxima: this.convocatoriaForm.controls[label].value['puntuacionMaxima'],
      tareas: this.convocatoriaForm.controls[label].value['tareas'],
      tipo: tipo
    }
    return parte
  }
  public addTareaComprensionAuditiva() {
    let tarea = this.formBuilder.group({
      nombreTarea: new FormControl(CONSTANTS.NOMBRE_TAREA_DEFECTO, Validators.required),
      valor: new FormControl(0, [Validators.required, Validators.min(0)])
    })
    this.listaTareasComprensionAuditiva.push(tarea)
  }
  public addTareaComprensionLectora() {
    let tarea = this.formBuilder.group({
      nombreTarea: new FormControl(CONSTANTS.NOMBRE_TAREA_DEFECTO, Validators.required),
      valor: new FormControl(0, [Validators.required, Validators.min(0)])
    })
    this.listaTareasComprensionLectora.push(tarea)
  }
  public addTareaExpresionEscrita() {
    let tarea = this.formBuilder.group({
      nombreTarea: new FormControl(CONSTANTS.NOMBRE_TAREA_DEFECTO, Validators.required),
      valor: new FormControl(0, [Validators.required, Validators.min(0)])
    })
    this.listaTareasExpresionEscrita.push(tarea)
  }
  public addTareaExpresionOral() {
    let tarea = this.formBuilder.group({
      nombreTarea: new FormControl(CONSTANTS.NOMBRE_TAREA_DEFECTO, Validators.required),
      valor: new FormControl(0, [Validators.required, Validators.min(0)])
    })
    this.listaTareasExpresionOral.push(tarea)
  }

  public deleteTareaComprensionAuditiva(index: number): void {
    this.listaTareasComprensionLectora.removeAt(index)
  }
  public deleteTareaComprensionLectora(index: number): void {
    this.listaTareasComprensionLectora.removeAt(index)
  }
  public deleteTareaExpresionEscrita(index: number): void {
    this.listaTareasComprensionLectora.removeAt(index)
  }
  public deleteTareaExpresionOral(index: number): void {
    this.listaTareasComprensionLectora.removeAt(index)
  }

  private createConvocatoriaAPI(convocatoria: Convocatoria): void {
    this.apiService
      .createConvocatoria(convocatoria)
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
      .subscribe(() => {
        this.router.navigateByUrl(MODULES.CONVOCATORIA + '/' + COMPONENTS.LIST)
      })
  }

  private updateConvocatoriaAPI(convocatoria: Convocatoria): void {
    this.apiService
      .updateConvocatoria(convocatoria)
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
      .subscribe(() => {
        this.router.navigate([])
      })
  }
  ngOnDestroy() {
    this.destroy$.next(true)
  }
}
