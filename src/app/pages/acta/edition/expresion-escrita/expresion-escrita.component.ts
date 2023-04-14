import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { CONSTANTS } from '@constants'
import { Tarea } from '@models/correccion'
import { Expresion } from '@models/expresion'

import { Usuario } from '@models/usuario'
import { ApiService } from '@services/api.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'expresion-escrita',
  templateUrl: './expresion-escrita.component.html',
  styleUrls: ['./expresion-escrita.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpresionEscritaComponent {
  @Input() expresionEscrita!: Expresion
  @Input() puntuacionMaxima!: number

  loading: boolean = true
  form: FormGroup = new FormGroup({})

  corrector$: Observable<Usuario[]> = this.apiService.getUsuarios()

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {}

  ngOnInit() {
    this.expresionEscrita.idExpresion ? this.loadForm() : this.initializeNewForm()
    this.expresionEscrita.puntuacionMaxima = this.puntuacionMaxima
    this.loadTareas()
  }

  private initializeNewForm() {
    this.form = this.formBuilder.group({
      observaciones: [''],
      corrector: ['', Validators.required],
      correccion1: this.formBuilder.group({
        corrector: ['', Validators.required],
        listaTareas: this.formBuilder.array([])
      }),
      correccion2: this.formBuilder.group({
        corrector: ['', Validators.required],
        listaTareas: this.formBuilder.array([])
      })
    })
    this.loading = false
  }
  private loadForm() {
    this.loading = false
  }

  private loadTareas() {
    this.expresionEscrita.correccion1.listaTareas.forEach((tarea: Tarea) => {
      let tareaForm = this.formBuilder.group({
        nombreTarea: new FormControl(tarea.nombreTarea, Validators.required),
        valor: new FormControl(tarea.valor, [Validators.required, Validators.min(0)])
      })
      this.listaTareasCorrector1.push(tareaForm)
    })
    this.expresionEscrita.correccion2.listaTareas.forEach((tarea: Tarea) => {
      let tareaForm = this.formBuilder.group({
        nombreTarea: new FormControl(tarea.nombreTarea, Validators.required),
        valor: new FormControl(tarea.valor, [Validators.required, Validators.min(0)])
      })
      this.listaTareasCorrector2.push(tareaForm)
    })
  }
  public get listaTareasCorrector1() {
    return this.form.get('tareasCorrector1')?.get('listaTareas') as FormArray
  }
  public get listaTareasCorrector2() {
    return this.form.get('tareasCorrector2')?.get('listaTareas') as FormArray
  }

  public save(): void {
    if (this.form.valid) {
      this.extractForm()
      this.apiService.updateExpresion(this.expresionEscrita)
    }
  }

  private calcularPorcentaje(): number {
    return (this.expresionEscrita.puntosConseguidos * CONSTANTS.PORCIENTO) / this.expresionEscrita.puntuacionMaxima
  }

  private calcularPuntosTotales(): number {
    let puntosTotales: number = 0
    this.listaTareasCorrector1.controls.forEach((control) => {
      if (control.valid) puntosTotales += control.value['valor']
    })
    this.expresionEscrita.puntosConseguidos = puntosTotales
    return puntosTotales
  }
  private extractForm(): void {
    this.expresionEscrita = {
      tipo: 'Escrita',
      correccion1: this.form.value['correccion1'],
      correccion2: this.form.value['correccion1'],
      observaciones: this.form.value['observaciones'],
      puntuacionMaxima: this.puntuacionMaxima,
      puntosConseguidos: this.calcularPuntosTotales(),
      porcentaje: this.calcularPorcentaje()
    }
  }
}
