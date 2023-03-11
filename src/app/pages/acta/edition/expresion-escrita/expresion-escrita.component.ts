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

  @Input() expresionEscrita!: ExpresionEscrita
  @Input() puntuacionMaxima!: number

  loading: boolean = true
  form: FormGroup = new FormGroup({})

  corrector$: Observable<Usuario[]> = this.apiService.getUsuarios()

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }
  ngOnInit() {
    this.expresionEscrita.id_expresion_escrita ? this.loadForm() : this.initializeNewForm()
    this.expresionEscrita.puntuacionMaximaParte = this.puntuacionMaxima
    this.loadTareas()
  }

  private initializeNewForm() {
    this.form = this.formBuilder.group({
      observaciones: [''],
      corrector: ['', Validators.required],
      listaTareas: this.formBuilder.array([]),
    })
    this.loading = false
  }
  private loadForm() { this.loading = false }

  private loadTareas() {
    this.expresionEscrita.listaTareas.forEach(tarea => {
      let tareaForm = this.formBuilder.group({
        nombreTarea: new FormControl(tarea.nombreTarea, Validators.required),
        valor: new FormControl(tarea.valor, [Validators.required, Validators.min(0)])
      })
      this.listaTareas.push(tareaForm)
    })

  }
  public get listaTareas() {
    return this.form.get('listaTareas') as FormArray;
  }

  public save(): void {
    if (this.form.valid) {
      this.extractForm()
      this.apiService.updateComprensionLectora(this.expresionEscrita)
    }
  }

  private calcularPorcentaje(): number {
    return this.expresionEscrita.puntosConseguidos * CONSTANTS.PORCIENTO / this.expresionEscrita.puntuacionMaximaParte
  }

  private calcularPuntosTotales(): number {
    let puntosTotales: number = 0;
    this.listaTareas.controls.forEach(control => {
      if (control.valid)
        puntosTotales += control.value['valor']
    })
    this.expresionEscrita.puntosConseguidos = puntosTotales
    return puntosTotales
  }
  private extractForm(): void {
    this.expresionEscrita = {
      corrector: this.form.value['corrector'],
      observaciones: this.form.value['observaciones'],
      listaTareas: this.form.value['listaTareas'],
      puntuacionMaximaParte: this.puntuacionMaxima,
      puntosConseguidos: this.calcularPuntosTotales(),
      porcentaje: this.calcularPorcentaje()
    }
  }
}
