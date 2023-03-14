import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CONSTANTS } from '@constants';
import { ExpresionEscrita } from '@models/expresion_escrita';
import { Usuario } from '@models/usuario';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'expresion-escrita',
  templateUrl: './expresion-escrita.component.html',
  styleUrls: ['./expresion-escrita.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpresionEscritaComponent {

  @Input() expresion_escrita!: ExpresionEscrita
  @Input() puntuacion_maxima!: number

  loading: boolean = true
  form: FormGroup = new FormGroup({})

  corrector$: Observable<Usuario[]> = this.apiService.getUsuarios()

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
    this.expresion_escrita.id_expresion_escrita ? this.loadForm() : this.initializeNewForm()
    this.expresion_escrita.puntuacion_maxima = this.puntuacion_maxima
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
    this.expresion_escrita.tareas_corrector_1.lista_tareas.forEach(tarea => {
      let tareaForm = this.formBuilder.group({
        nombreTarea: new FormControl(tarea.nombreTarea, Validators.required),
        valor: new FormControl(tarea.valor, [Validators.required, Validators.min(0)])
      })
      this.listaTareasCorrector1.push(tareaForm)
    })
    this.expresion_escrita.tareas_corrector_2.lista_tareas.forEach(tarea => {
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
      this.apiService.updateExpresionEscrita(this.expresion_escrita)
    }
  }

  private calcularPorcentaje(): number {
    return this.expresion_escrita.puntos_conseguidos * CONSTANTS.PORCIENTO / this.expresion_escrita.puntuacion_maxima
  }

  private calcularPuntosTotales(): number {
    let puntosTotales: number = 0;
    this.listaTareasCorrector1.controls.forEach(control => {
      if (control.valid)
        puntosTotales += control.value['valor']
    })
    this.expresion_escrita.puntos_conseguidos = puntosTotales
    return puntosTotales
  }
  private extractForm(): void {
    this.expresion_escrita = {
      tareas_corrector_1: this.form.value[''],
      tareas_corrector_2: this.form.value[''],
      observaciones: this.form.value['observaciones'],
      puntuacion_maxima: this.puntuacion_maxima,
      puntos_conseguidos: this.calcularPuntosTotales(),
      porcentaje: this.calcularPorcentaje()
    }
  }
}
