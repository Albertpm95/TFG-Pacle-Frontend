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

  @Input() comprensionLectora!: ComprensionLectora
  @Input() puntuacionMaxima!: number

  loading: boolean = true
  form: FormGroup = new FormGroup({})

  corrector$: Observable<Usuario[]> = this.apiService.getUsuarios()

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }
  ngOnInit() {
    this.comprensionLectora.id_comprension_lectora ? this.loadForm() : this.initializeNewForm()
    this.comprensionLectora.puntuacionMaximaParte = this.puntuacionMaxima
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
    this.comprensionLectora.listaTareas.forEach(tarea => {
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
      this.apiService.updateComprensionLectora(this.comprensionLectora)
    }
  }

  private calcularPorcentaje(): number {
    return this.comprensionLectora.puntosConseguidos * CONSTANTS.PORCIENTO / this.comprensionLectora.puntuacionMaximaParte
  }

  private calcularPuntosTotales(): number {
    let puntosTotales: number = 0;
    this.listaTareas.controls.forEach(control => {
      if (control.valid)
        puntosTotales += control.value['valor']
    })
    this.comprensionLectora.puntosConseguidos = puntosTotales
    return puntosTotales
  }
  private extractForm(): void {
    this.comprensionLectora = {
      corrector: this.form.value['corrector'],
      observaciones: this.form.value['observaciones'],
      listaTareas: this.form.value['listaTareas'],
      puntuacionMaximaParte: this.puntuacionMaxima,
      puntosConseguidos: this.calcularPuntosTotales(),
      porcentaje: this.calcularPorcentaje()
    }
  }

}
