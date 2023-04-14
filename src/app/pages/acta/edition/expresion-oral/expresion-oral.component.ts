import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { CONSTANTS } from '@constants'
import { ExpresionOral } from '@models/expresion_oral'

import { Usuario } from '@models/usuario'
import { ApiService } from '@services/api.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'expresion-oral',
  templateUrl: './expresion-oral.component.html',
  styleUrls: ['./expresion-oral.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpresionOralComponent {
  @Input() expresionOral!: ExpresionOral
  @Input() puntuacionMaxima!: number

  loading: boolean = true
  form: FormGroup = new FormGroup({})

  corrector$: Observable<Usuario[]> = this.apiService.getUsuarios()

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.expresionOral.idExpresionOral
      ? this.loadForm()
      : this.initializeNewForm()
    this.expresionOral.puntuacionMaxima = this.puntuacionMaxima
    this.loadTareas()
  }

  private initializeNewForm() {
    this.form = this.formBuilder.group({
      observaciones: [''],
      corrector: ['', Validators.required],
      tareasCorrector1: this.formBuilder.group({
        corrector: ['', Validators.required],
        listaTareas: this.formBuilder.array([]),
      }),
      tareasCorrector2: this.formBuilder.group({
        corrector: ['', Validators.required],
        listaTareas: this.formBuilder.array([]),
      }),
    })
    this.loading = false
  }
  private loadForm() {
    this.loading = false
  }

  private loadTareas() {
    this.expresionOral.tareasCorrector1.listaTareas.forEach((tarea) => {
      let tareaForm = this.formBuilder.group({
        nombreTarea: new FormControl(tarea.nombreTarea, Validators.required),
        valor: new FormControl(tarea.valor, [
          Validators.required,
          Validators.min(0),
        ]),
      })
      this.listaTareasCorrector1.push(tareaForm)
    })
    this.expresionOral.tareasCorrector2.listaTareas.forEach((tarea) => {
      let tareaForm = this.formBuilder.group({
        nombreTarea: new FormControl(tarea.nombreTarea, Validators.required),
        valor: new FormControl(tarea.valor, [
          Validators.required,
          Validators.min(0),
        ]),
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
      this.apiService.updateExpresionOral(this.expresionOral)
    }
  }

  private calcularPorcentaje(): number {
    return (
      (this.expresionOral.puntosConseguidos * CONSTANTS.PORCIENTO) /
      this.expresionOral.puntuacionMaxima
    )
  }

  private calcularPuntosTotales(): number {
    let puntosTotales: number = 0
    this.listaTareasCorrector1.controls.forEach((control) => {
      if (control.valid) puntosTotales += control.value['valor']
    })
    this.expresionOral.puntosConseguidos = puntosTotales
    return puntosTotales
  }
  private extractForm(): void {
    this.expresionOral = {
      tareasCorrector1: this.form.value[''],
      tareasCorrector2: this.form.value[''],
      observaciones: this.form.value['observaciones'],
      puntuacionMaxima: this.puntuacionMaxima,
      puntosConseguidos: this.calcularPuntosTotales(),
      porcentaje: this.calcularPorcentaje(),
    }
  }
}
