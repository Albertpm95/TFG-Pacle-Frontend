import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { COMPONENTS, CONSTANTS, MODULES } from '@constants'
import { Convocatoria } from '@models/convocatoria'
import { Horario } from '@models/horario'
import { Lenguaje } from '@models/lenguaje'
import { Nivel } from '@models/nivel'
import { Parte } from '@models/parte'
import { ApiService } from '@services/api.service'
import { Observable, Subject, forkJoin, take, takeUntil } from 'rxjs'

@Component({
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent implements OnInit, OnDestroy {
  convocatoriaForm: FormGroup = new FormGroup('')

  convocatoria: Convocatoria | undefined
  loading = true

  listaLenguajesConvocatoria: Lenguaje[] = []
  listaHorariosConvocatoria: Horario[] = []
  listaNivelesConvocatoria: Nivel[] = []

  listsLoaded = Observable<number>

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private activactedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeLists()
  }

  public saveConvocatoria(idConvocatoria?: number): void {
    this.loading = true
    if (this.convocatoriaForm.valid) {
      const convocatoria: Convocatoria = this.extractConvocatoriaForm()
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
    const date_string = this.convocatoriaForm.controls['fechaParcial'].value
    const hora_parcial = this.convocatoriaForm.controls['horario'].value.horario.split(':')
    const fechaParcial = new Date(date_string)
    fechaParcial.setHours(hora_parcial[0])
    fechaParcial.setMinutes(hora_parcial[1])
    return fechaParcial
  }
  private extractConvocatoriaForm(): Convocatoria {
    const convocatoria: Convocatoria = {
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
      specificIdentifier: ''
    }
    return convocatoria
  }

  private extractParte(label: string, tipo: string): Parte {
    const parte: Parte = {
      puntuacionMaxima: this.convocatoriaForm.controls[label].value['puntuacionMaxima'],
      tareas: this.convocatoriaForm.controls[label].value['tareas'] ?? [],
      tipo: tipo
    }
    return parte
  }
  // TODO Fusion add tareas functions
  public addTareaComprensionAuditiva() {
    const tarea = this.formBuilder.group({
      nombreTarea: new FormControl(CONSTANTS.NOMBRE_TAREA_DEFECTO, Validators.required),
      valor: new FormControl(0, [Validators.required, Validators.min(0)])
    })
    this.listaTareasComprensionAuditiva.push(tarea)
  }
  public addTareaComprensionLectora() {
    const tarea = this.formBuilder.group({
      nombreTarea: new FormControl(CONSTANTS.NOMBRE_TAREA_DEFECTO, Validators.required),
      valor: new FormControl(0, [Validators.required, Validators.min(0)])
    })
    this.listaTareasComprensionLectora.push(tarea)
  }
  public addTareaExpresionEscrita() {
    const tarea = this.formBuilder.group({
      nombreTarea: new FormControl(CONSTANTS.NOMBRE_TAREA_DEFECTO, Validators.required),
      valor: new FormControl(0, [Validators.required, Validators.min(0)])
    })
    this.listaTareasExpresionEscrita.push(tarea)
  }
  public addTareaExpresionOral() {
    const tarea = this.formBuilder.group({
      nombreTarea: new FormControl(CONSTANTS.NOMBRE_TAREA_DEFECTO, Validators.required),
      valor: new FormControl(0, [Validators.required, Validators.min(0)])
    })
    this.listaTareasExpresionOral.push(tarea)
  }
  // TODO Fusion Delete tareas functions
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
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log('Navigating')
        this.router.navigateByUrl(MODULES.CONVOCATORIA + '/' + COMPONENTS.LIST)
      })
  }

  private updateConvocatoriaAPI(convocatoria: Convocatoria): void {
    this.apiService
      .updateConvocatoria(convocatoria)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log('Navigating')
        this.router.navigateByUrl(MODULES.CONVOCATORIA + '/' + COMPONENTS.LIST)
      })
  }

  private initializeLists(): void {
    const initializations = forkJoin({
      lenguajes: this.apiService.getLenguajesConvocatoria(),
      horarios: this.apiService.getHorariosConvocatoria(),
      niveles: this.apiService.getNivelesConvocatoria()
    })
    initializations.pipe(take(1)).subscribe((loadedLists) => {
      if (loadedLists) {
        this.listaHorariosConvocatoria = loadedLists.horarios
        this.listaLenguajesConvocatoria = loadedLists.lenguajes
        this.listaNivelesConvocatoria = loadedLists.niveles
        this.initializeConvocatoria()
      }
    })
  }
  private initializeConvocatoria(): void {
    const idConvocatoria = this.activactedRoute.snapshot.params['idConvocatoria']
    if (idConvocatoria) {
      this.apiService
        .getConvocatoriaID(idConvocatoria)
        .pipe(take(1))
        .subscribe((convocatoria: Convocatoria) => {
          this.convocatoria = convocatoria
          this.createForm()
        })
    } else {
      this.convocatoria = {
        estado: true,
        fecha: new Date(),
        horario: this.listaHorariosConvocatoria[0],
        nivel: this.listaNivelesConvocatoria[0],
        lenguaje: this.listaLenguajesConvocatoria[0],
        parteComprensionAuditiva: { puntuacionMaxima: 0, tareas: [], tipo: 'Comprension Auditiva' },
        parteComprensionLectora: { puntuacionMaxima: 0, tareas: [], tipo: 'Comprension Lectora' },
        parteExpresionEscrita: { puntuacionMaxima: 0, tareas: [], tipo: 'Expresion Escrita' },
        parteExpresionOral: { puntuacionMaxima: 0, tareas: [], tipo: 'Expresion Oral' },
        specificIdentifier: ''
      }
      this.createForm()
    }
  }
  private createForm(): void {
    if (this.convocatoria)
      this.convocatoriaForm = this.formBuilder.group({
        estado: [this.convocatoria.estado],
        fechaParcial: [this.convocatoria.fecha, Validators.required], // Date sin el horario
        horario: [this.convocatoria.horario, Validators.required],
        lenguaje: [this.convocatoria.lenguaje, Validators.required],
        nivel: [this.convocatoria.nivel, Validators.required],
        specificIdentifier: '',
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
    this.convocatoriaForm.reset
    this.loading = false
  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }
}
