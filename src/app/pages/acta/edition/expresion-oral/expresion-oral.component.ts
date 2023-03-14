import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CONSTANTS } from '@constants';
import { ExpresionOral } from '@models/expresion_oral';
import { Usuario } from '@models/usuario';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'expresion-oral',
  templateUrl: './expresion-oral.component.html',
  styleUrls: ['./expresion-oral.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpresionOralComponent {

  @Input() expresion_oral!: ExpresionOral
  @Input() puntuacion_maxima!: number

  loading: boolean = true
  form: FormGroup = new FormGroup({})

  corrector$: Observable<Usuario[]> = this.apiService.getUsuarios()

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
    this.expresion_oral.id_expresion_oral ? this.loadForm() : this.initializeNewForm()
    this.expresion_oral.puntuacion_maxima = this.puntuacion_maxima
    this.loadTareas()
  }

  private initializeNewForm() {
    this.form = this.formBuilder.group({
      observaciones: [''],
      corrector: ['', Validators.required],
      tareas_corrector_1: this.formBuilder.group({
        corrector: ['', Validators.required],
        lista_tareas: this.formBuilder.array([])
      }),
      tareas_corrector_2: this.formBuilder.group({
        corrector: ['', Validators.required],
        lista_tareas: this.formBuilder.array([])
      })
    })
    this.loading = false
  }
  private loadForm() { this.loading = false }

  private loadTareas() {
    this.expresion_oral.tareas_corrector_1.lista_tareas.forEach(tarea => {
      let tareaForm = this.formBuilder.group({
        nombreTarea: new FormControl(tarea.nombreTarea, Validators.required),
        valor: new FormControl(tarea.valor, [Validators.required, Validators.min(0)])
      })
      this.listaTareasCorrector1.push(tareaForm)
    })
    this.expresion_oral.tareas_corrector_2.lista_tareas.forEach(tarea => {
      let tareaForm = this.formBuilder.group({
        nombreTarea: new FormControl(tarea.nombreTarea, Validators.required),
        valor: new FormControl(tarea.valor, [Validators.required, Validators.min(0)])
      })
      this.listaTareasCorrector2.push(tareaForm)
    })
  }
  public get listaTareasCorrector1() {
    return this.form.get('tareas_corrector_1')?.get('lista_tareas') as FormArray;
  }
  public get listaTareasCorrector2() {
    return this.form.get('tareas_corrector_2')?.get('lista_tareas') as FormArray;
  }

  public save(): void {
    if (this.form.valid) {
      this.extractForm()
      this.apiService.updateExpresionOral(this.expresion_oral)
    }
  }

  private calcularPorcentaje(): number {
    return this.expresion_oral.puntos_conseguidos * CONSTANTS.PORCIENTO / this.expresion_oral.puntuacion_maxima
  }

  private calcularPuntosTotales(): number {
    let puntosTotales: number = 0;
    this.listaTareasCorrector1.controls.forEach(control => {
      if (control.valid)
        puntosTotales += control.value['valor']
    })
    this.expresion_oral.puntos_conseguidos = puntosTotales
    return puntosTotales
  }
  private extractForm(): void {
    this.expresion_oral = {
      tareas_corrector_1: this.form.value[''],
      tareas_corrector_2: this.form.value[''],
      observaciones: this.form.value['observaciones'],
      puntuacion_maxima: this.puntuacion_maxima,
      puntos_conseguidos: this.calcularPuntosTotales(),
      porcentaje: this.calcularPorcentaje()
    }
  }
}
