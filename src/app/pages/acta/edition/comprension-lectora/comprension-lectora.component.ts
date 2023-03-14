import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CONSTANTS } from '@constants';
import { ComprensionLectora } from '@models/comprension_lectora';
import { Usuario } from '@models/usuario';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'comprension-lectora',
  templateUrl: './comprension-lectora.component.html',
  styleUrls: ['./comprension-lectora.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComprensionLectoraComponent {

  @Input() comprension_lectora!: ComprensionLectora
  @Input() puntuacion_maxima!: number

  loading: boolean = true
  form: FormGroup = new FormGroup({})

  corrector$: Observable<Usuario[]> = this.apiService.getUsuarios()

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }
  ngOnInit() {
    this.comprension_lectora.id_comprension_lectora ? this.loadForm() : this.initializeNewForm()
    this.comprension_lectora.puntuacion_maxima = this.puntuacion_maxima
    this.loadTareas()
  }

  private initializeNewForm() {
    this.form = this.formBuilder.group({
      observaciones: [''],
      corrector: ['', Validators.required],
      lista_tareas: this.formBuilder.array([]),
    })
    this.loading = false
  }
  private loadForm() { this.loading = false }

  private loadTareas() {
    this.comprension_lectora.lista_tareas.forEach(tarea => {
      let tareaForm = this.formBuilder.group({
        nombreTarea: new FormControl(tarea.nombreTarea, Validators.required),
        valor: new FormControl(tarea.valor, [Validators.required, Validators.min(0)])
      })
      this.lista_tareas.push(tareaForm)
    })

  }
  public get lista_tareas() {
    return this.form.get('lista_tareas') as FormArray;
  }

  public save(): void {
    if (this.form.valid) {
      this.extractForm()
      this.apiService.updateComprensionLectora(this.comprension_lectora)
    }
  }

  private calcularPorcentaje(): number {
    return this.comprension_lectora.puntos_conseguidos * CONSTANTS.PORCIENTO / this.comprension_lectora.puntuacion_maxima
  }

  private calcularPuntosTotales(): number {
    let puntosTotales: number = 0;
    this.lista_tareas.controls.forEach(control => {
      if (control.valid)
        puntosTotales += control.value['valor']
    })
    this.comprension_lectora.puntos_conseguidos = puntosTotales
    return puntosTotales
  }
  private extractForm(): void {
    this.comprension_lectora = {
      corrector: this.form.value['corrector'],
      observaciones: this.form.value['observaciones'],
      lista_tareas: this.form.value['lista_tareas'],
      puntuacion_maxima: this.puntuacion_maxima,
      puntos_conseguidos: this.calcularPuntosTotales(),
      porcentaje: this.calcularPorcentaje()
    }
  }

}
