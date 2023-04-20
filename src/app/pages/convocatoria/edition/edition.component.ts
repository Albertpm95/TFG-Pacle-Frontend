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

  listaLenguajesConvocatoria: Lenguaje[] = []
  listaHorariosConvocatoria: Horario[] = []
  listaNivelesConvocatoria: Nivel[] = []

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private activactedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeLists()
    let idConvocatoria = this.activactedRoute.snapshot.params['idConvocatoria']
    if (this.initializeLists()) {
      if (idConvocatoria === undefined) {
        this.initializeNewForm()
      } else if (idConvocatoria) {
        this.loadForm(idConvocatoria)
      }
    }
  }
  private initializeNewForm(): void {
    this.convocatoriaForm = this.formBuilder.group({
      estado: [true],
      fechaParcial: [Date.now, [Validators.required]], // Date sin el horario
      horario: [
        this.listaHorariosConvocatoria[0],
        [Validators.required, Validators.pattern('([01]?[0-9]|2[0-4]):([0-5]?[0-9])')]
      ],
      lenguaje: [this.listaLenguajesConvocatoria[0], [Validators.required]],
      nivel: [this.listaNivelesConvocatoria[0], [Validators.required]],
      specificIdentifier: [''],
      parteComprensionAuditiva: this.formBuilder.group({
        puntuacionMaxima: [0, Validators.required],
        listaTareas: this.formBuilder.array([])
      }),
      parteComprensionLectora: this.formBuilder.group({
        puntuacionMaxima: [0, Validators.required],
        listaTareas: this.formBuilder.array([])
      }),
      parteExpresionEscrita: this.formBuilder.group({
        puntuacionMaxima: [0, Validators.required],
        listaTareas: this.formBuilder.array([])
      }),
      parteExpresionOral: this.formBuilder.group({
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
      .subscribe((convocatoria: Convocatoria) => {
        this.convocatoria = convocatoria
        this.transformConvocatoriaToForm()
      })
    console.log(this.convocatoriaForm)
  }

  private transformConvocatoriaToForm(): void {
    if (this.convocatoria)
      this.convocatoriaForm = this.formBuilder.group({
        estado: [this.convocatoria.estado],
        fechaParcial: [this.convocatoria.fecha, Validators.required], // Date sin el horario
        horario: [
          this.convocatoria.horario,
          [Validators.required, Validators.pattern('([01]?[0-9]|2[0-4]):([0-5]?[0-9])')]
        ],
        lenguaje: [this.convocatoria.lenguaje, Validators.required],
        nivel: [this.convocatoria.nivel, [Validators.required]],
        parteComprensionAuditiva: this.formBuilder.group({
          puntuacionMaxima: [this.convocatoria.parteComprensionAuditiva.puntuacionMaxima, Validators.required],
          listaTareas: this.formBuilder.array([])
        }),
        parteComprensionLectora: this.formBuilder.group({
          puntuacionMaxima: [this.convocatoria.parteComprensionLectora.puntuacionMaxima, Validators.required],
          listaTareas: this.formBuilder.array([])
        }),
        parteExpresionEscrita: this.formBuilder.group({
          puntuacionMaxima: [this.convocatoria.parteExpresionEscrita.puntuacionMaxima, Validators.required],
          listaTareas: this.formBuilder.array([])
        }),
        parteExpresionOral: this.formBuilder.group({
          puntuacionMaxima: [this.convocatoria.parteExpresionOral.puntuacionMaxima, Validators.required],
          listaTareas: this.formBuilder.array([])
        })
      })
    this.loading = false
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
    return this.convocatoriaForm.get('parteComprensionAuditiva')?.get('listaTareas') as FormArray
  }
  public get listaTareasComprensionLectora() {
    return this.convocatoriaForm.get('parteComprensionLectora')?.get('listaTareas') as FormArray
  }
  public get listaTareasExpresionEscrita() {
    return this.convocatoriaForm.get('parteExpresionEscrita')?.get('listaTareas') as FormArray
  }
  public get listaTareasExpresionOral() {
    return this.convocatoriaForm.get('parteExpresionOral')?.get('listaTareas') as FormArray
  }

  private extractFecha(): Date {
    let date_string = this.convocatoriaForm.controls['fechaParcial'].value
    let hora_parcial = this.convocatoriaForm.controls['horario'].value.horario.split(':')
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
      parteComprensionAuditiva: this.extractParte('parteComprensionAuditiva', 'Comprension Auditiva'),
      parteComprensionLectora: this.extractParte('parteComprensionLectora', 'Comprension Lectora'),
      parteExpresionEscrita: this.extractParte('parteExpresionEscrita', 'Expresion Escrita'),
      parteExpresionOral: this.extractParte('parteExpresionOral', 'Expresion Oral'),
      specificIdentifier: this.convocatoriaForm.controls['specificIdentifier'].value
    }
    return convocatoria
  }

  private extractParte(label: string, tipo: string): Parte {
    let parte: Parte = {
      puntuacionMaxima: this.convocatoriaForm.controls[label].value['puntuacionMaxima'],
      tareas: this.convocatoriaForm.controls[label].value['tareas'] ?? [],
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

  private initializeLists(): boolean {
    let listsLoaded: boolean = false
    this.apiService
      .getLenguajesConvocatoria()
      .pipe(
        takeUntil(this.destroy$),
        catchError((error): Observable<never> => {
          console.error('Error fetching data from api:', error)
          listsLoaded = false
          return throwError(() => error)
        }),
        finalize(() => {
          this.loading = false
        }),
        throwIfEmpty(() => {
          console.log('Vacio')
        })
      )
      .subscribe((lenguajes: Lenguaje[]) => {
        this.listaLenguajesConvocatoria = lenguajes
        listsLoaded = true
      })
    this.apiService
      .getHorariosConvocatoria()
      .pipe(
        takeUntil(this.destroy$),
        catchError((error): Observable<never> => {
          console.error('Error fetching data from api:', error)
          listsLoaded = false
          return throwError(() => error)
        }),
        finalize(() => {
          this.loading = false
        }),
        throwIfEmpty(() => {
          console.log('Vacio')
        })
      )
      .subscribe((horarios: Horario[]) => {
        this.listaHorariosConvocatoria = horarios
        listsLoaded = true
      })
    this.apiService
      .getNivelesConvocatoria()
      .pipe(
        takeUntil(this.destroy$),
        catchError((error): Observable<never> => {
          console.error('Error fetching data from api:', error)
          listsLoaded = false
          return throwError(() => error)
        }),
        finalize(() => {
          this.loading = false
        }),
        throwIfEmpty(() => {
          console.log('Vacio')
        })
      )
      .subscribe((niveles: Nivel[]) => {
        this.listaNivelesConvocatoria = niveles
        listsLoaded = true
      })
    return listsLoaded
  }
  ngOnDestroy() {
    this.destroy$.next(true)
  }
}
