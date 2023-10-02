import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { COMPONENTS, CONSTANTS, MODULES } from '@constants'
import { ConvocatoriaDB, ConvocatoriaNueva } from '@models/convocatoria'
import { Tarea } from '@models/correccion'
import { Horario } from '@models/horario'
import { Lenguaje } from '@models/lenguaje'
import { Nivel } from '@models/nivel'
import { Parte, ParteNueva } from '@models/parte'
import { ApiService } from '@services/api.service'
import { Observable, Subject, catchError, finalize, forkJoin, take, takeUntil, throwError } from 'rxjs'

@Component({
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent implements OnInit, OnDestroy {
  convocatoriaForm: FormGroup = new FormGroup('')
  convocatoriaNueva: ConvocatoriaNueva | undefined
  convocatoriaDB: ConvocatoriaDB | undefined
  loading = true

  idConvocatoria: number | undefined

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
  ) { }

  ngOnInit(): void {
    this.initializeLists()
  }
  ngOnDestroy() {
    this.destroy$.next(true)
  }

  public saveConvocatoria(): void {
    this.loading = true
    if (this.convocatoriaForm.valid) {
      if (this.convocatoriaDB) {
        this.convocatoriaDB = this.extractConvocatoriaForm() as ConvocatoriaDB
        this.updateConvocatoriaAPI()
      } else if (this.convocatoriaNueva) {
        this.convocatoriaNueva = this.extractConvocatoriaForm() as ConvocatoriaNueva
        this.createConvocatoriaAPI()
      }
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
  private extractConvocatoriaForm(): ConvocatoriaNueva | ConvocatoriaDB {
    const convocatoria: ConvocatoriaNueva | ConvocatoriaDB = {
      estado: this.convocatoriaForm.controls['estado'].value,
      horario: this.convocatoriaForm.controls['horario'].value,
      lenguaje: this.convocatoriaForm.controls['lenguaje'].value,
      nivel: this.convocatoriaForm.controls['nivel'].value,
      fecha: this.extractFecha(),
      parteComprensionAuditiva: this.extractParte('parteComprensionAuditiva', 'Comprension Auditiva'),
      parteComprensionLectora: this.extractParte('parteComprensionLectora', 'Comprension Lectora'),
      parteExpresionEscrita: this.extractParte('parteExpresionEscrita', 'Expresion Escrita'),
      parteExpresionOral: this.extractParte('parteExpresionOral', 'Expresion Oral'),
      specificIdentifier: this.convocatoriaForm.controls['specificIdentifier'].value,
      idConvocatoria: this.idConvocatoria as number
    }
    if (this.convocatoriaDB) return convocatoria as ConvocatoriaDB
    else return convocatoria as ConvocatoriaNueva
  }

  private extractParte(label: string, tipo: string): Parte | ParteNueva {
    let idParte: number | undefined
    switch (label) {
      case 'parteComprensionAuditiva':
        if (this.convocatoriaDB?.parteComprensionAuditiva.idParte) {
          idParte = this.convocatoriaDB?.parteComprensionAuditiva.idParte
        }
        break
      case 'parteComprensionLectora':
        if (this.convocatoriaDB?.parteComprensionLectora.idParte) {
          idParte = this.convocatoriaDB?.parteComprensionLectora.idParte
        }
        break
      case 'parteExpresionEscrita':
        if (this.convocatoriaDB?.parteExpresionEscrita.idParte) {
          idParte = this.convocatoriaDB?.parteExpresionEscrita.idParte
        }
        break
      case 'parteExpresionOral':
        if (this.convocatoriaDB?.parteExpresionOral.idParte) {
          idParte = this.convocatoriaDB?.parteExpresionOral.idParte
        }
        break
      default:
        idParte = undefined
        break
    }
    console.log(this.convocatoriaForm.controls[label].value['puntuacionMaxima'])
    const parte: Parte | ParteNueva = {
      puntuacionMaxima: this.convocatoriaForm.controls[label].value['puntuacionMaxima'],
      tareas: this.convocatoriaForm.controls[label].value['listaTareas'] ?? [],
      tipo: tipo,
      idParte: idParte
    }
    console.log(parte)
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

  private createConvocatoriaAPI(): void {
    if (this.convocatoriaNueva)
      this.apiService
        .createConvocatoria(this.convocatoriaNueva)
        .pipe(
          takeUntil(this.destroy$),

          finalize(() => {
            this.loading = false
          })
        )
        .subscribe(() => {
          this.router.navigateByUrl(MODULES.CONVOCATORIA + '/' + COMPONENTS.LIST)
        })
  }

  private updateConvocatoriaAPI(): void {
    if (this.convocatoriaDB) {
      console.log(this.convocatoriaDB)
      this.apiService
        .updateConvocatoria(this.convocatoriaDB)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            this.loading = false
          })
        )
        .subscribe(() => {
          this.router.navigateByUrl(MODULES.CONVOCATORIA + '/' + COMPONENTS.LIST)
        })
    }
  }

  private initializeLists(): void {
    const initializations = forkJoin({
      lenguajes: this.apiService.getLenguajesConvocatoria(),
      horarios: this.apiService.getHorariosConvocatoria(),
      niveles: this.apiService.getNivelesConvocatoria()
    })
    initializations.pipe(takeUntil(this.destroy$)).subscribe((loadedLists) => {
      if (loadedLists) {
        this.listaHorariosConvocatoria = loadedLists.horarios
        this.listaLenguajesConvocatoria = loadedLists.lenguajes
        this.listaNivelesConvocatoria = loadedLists.niveles
        this.initializeConvocatoria()
      }
    })
  }
  private initializeConvocatoria(): void {
    this.idConvocatoria = this.activactedRoute.snapshot.params['idConvocatoria'] as number
    if (this.idConvocatoria) {
      this.apiService
        .getConvocatoriaID(this.idConvocatoria)
        .pipe(take(1))
        .subscribe((convocatoria: ConvocatoriaDB) => {
          this.convocatoriaDB = convocatoria
          this.createForm(this.convocatoriaDB)
        })
    } else {
      this.convocatoriaNueva = {
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
      this.createForm(this.convocatoriaNueva)
    }
  }
  private createForm(convocatoria: ConvocatoriaDB | ConvocatoriaNueva): void {
    if (convocatoria) {
      this.convocatoriaForm = this.formBuilder.group({
        estado: [convocatoria.estado],
        fechaParcial: [convocatoria.fecha, Validators.required], // Date sin el horario
        horario: [convocatoria.horario, Validators.required],
        lenguaje: [convocatoria.lenguaje, Validators.required],
        nivel: [convocatoria.nivel, [Validators.required]],
        specificIdentifier: [convocatoria.specificIdentifier, [Validators.required]],
        parteComprensionAuditiva: this.formBuilder.group({
          puntuacionMaxima: [convocatoria.parteComprensionAuditiva.puntuacionMaxima, Validators.required],
          listaTareas: this.crearFormArrayDesdeLista(convocatoria.parteComprensionAuditiva.tareas)
        }),
        parteComprensionLectora: this.formBuilder.group({
          puntuacionMaxima: [convocatoria.parteComprensionLectora.puntuacionMaxima, Validators.required],
          listaTareas: this.crearFormArrayDesdeLista(convocatoria.parteComprensionLectora.tareas)
        }),
        parteExpresionEscrita: this.formBuilder.group({
          puntuacionMaxima: [convocatoria.parteExpresionEscrita.puntuacionMaxima, Validators.required],
          listaTareas: this.crearFormArrayDesdeLista(convocatoria.parteExpresionEscrita.tareas)
        }),
        parteExpresionOral: this.formBuilder.group({
          puntuacionMaxima: [convocatoria.parteExpresionOral.puntuacionMaxima, Validators.required],
          listaTareas: this.crearFormArrayDesdeLista(convocatoria.parteExpresionOral.tareas)
        })
      })
      console.log(this.convocatoriaForm)
      this.loading = false
    }
  }

  crearFormArrayDesdeLista(listaTareas: Tarea[]): FormArray {
    const formGroupArray = listaTareas.map((tarea) => {
      return this.formBuilder.group({
        nombreTarea: new FormControl(tarea.nombreTarea, Validators.required),
        valor: new FormControl(0, [Validators.required, Validators.min(0)]),
        idTarea: new FormControl(tarea.idTarea)
      })
    })

    return this.formBuilder.array(formGroupArray)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  compareFn(obj1: any, obj2: any) {
    // To make the mat-select load the value if updating convocatoria
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2
  }
}
