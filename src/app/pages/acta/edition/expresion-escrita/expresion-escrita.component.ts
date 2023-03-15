import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CONSTANTS } from '@constants';
import { ExpresionEscrita } from '@models/expresionEscrita';
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

  @Input() expresionEscrita!: ExpresionEscrita
  @Input() puntuacionMaxima!: number

  loading: boolean = true
  form: FormGroup = new FormGroup({})

  corrector$: Observable<Usuario[]> = this.apiService.getUsuarios()

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
    this.expresionEscrita.idExpresionEscrita ? this.loadForm() : this.initializeNewForm()
    this.expresionEscrita.puntuacionMaxima = this.puntuacionMaxima
    this.loadTareas()
  }

  private initializeNewForm() {
    this.form = this.formBuilder.group({
      observaciones: [''],
      corrector: ['', Validators.required],
      tareasCorrector1: this.formBuilder.group({
        corrector: ['', Validators.required],
        listaTareas: this.formBuilder.array([])
      }),
      tareasCorrector2: this.formBuilder.group({
        corrector: ['', Validators.required],
        listaTareas: this.formBuilder.array([])
      })
    })
    this.loading = false
  }
  private loadForm() { this.loading = false }

  private loadTareas() {
    this.expresionEscrita.tareasCorrector1.listaTareas.forEach(tarea => {
      let tareaForm = this.formBuilder.group({
        nombreTarea: new FormControl(tarea.nombreTarea, Validators.required),
        valor: new FormControl(tarea.valor, [Validators.required, Validators.min(0)])
      })
      this.listaTareasCorrector1.push(tareaForm)
    })
    this.expresionEscrita.tareasCorrector2.listaTareas.forEach(tarea => {
      let tareaForm = this.formBuilder.group({
        nombreTarea: new FormControl(tarea.nombreTarea, Validators.required),
        valor: new FormControl(tarea.valor, [Validators.required, Validators.min(0)])
      })
      this.listaTareasCorrector2.push(tareaForm)
    })
  }
  public get listaTareasCorrector1() {
    return this.form.get('tareasCorrector1')?.get('listaTareas') as FormArray;
  }
  public get listaTareasCorrector2() {
    return this.form.get('tareasCorrector2')?.get('listaTareas') as FormArray;
  }

  public save(): void {
    if (this.form.valid) {
      this.extractForm()
      this.apiService.updateExpresionEscrita(this.expresionEscrita)
    }
  }

  private calcularPorcentaje(): number {
    return this.expresionEscrita.puntosConseguidos * CONSTANTS.PORCIENTO / this.expresionEscrita.puntuacionMaxima
  }

  private calcularPuntosTotales(): number {
    let puntosTotales: number = 0;
    this.listaTareasCorrector1.controls.forEach(control => {
      if (control.valid)
        puntosTotales += control.value['valor']
    })
    this.expresionEscrita.puntosConseguidos = puntosTotales
    return puntosTotales
  }
  private extractForm(): void {
    this.expresionEscrita = {
      tareasCorrector1: this.form.value[''],
      tareasCorrector2: this.form.value[''],
      observaciones: this.form.value['observaciones'],
      puntuacionMaxima: this.puntuacionMaxima,
      puntosConseguidos: this.calcularPuntosTotales(),
      porcentaje: this.calcularPorcentaje()
    }
  }
}
