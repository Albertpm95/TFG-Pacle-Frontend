import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CONSTANTS } from '@constants';
import { ComprensionAuditiva } from '@models/comprension_auditiva';
import { Usuario } from '@models/usuario';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'comprension-auditiva',
  templateUrl: './comprension-auditiva.component.html',
  styleUrls: ['./comprension-auditiva.component.scss']
})
export class ComprensionAuditivaComponent {

  @Input() comprension_auditiva!: ComprensionAuditiva
  @Input() puntuacion_maxima!: number

  loading: boolean = true
  form: FormGroup = new FormGroup({})

  corrector$: Observable<Usuario[]> = this.apiService.getUsuarios()

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
    this.comprension_auditiva.id_comprension_auditiva ? this.loadForm() : this.initializeNewForm()
    this.comprension_auditiva.puntuacion_maxima = this.puntuacion_maxima
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
    this.comprension_auditiva.lista_tareas.forEach(tarea => {
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
      this.apiService.updateComprensionAuditiva(this.comprension_auditiva)
    }
  }

  private calcularPorcentaje(): number {
    return this.comprension_auditiva.puntos_conseguidos * CONSTANTS.PORCIENTO / this.comprension_auditiva.puntuacion_maxima
  }

  private calcularPuntosTotales(): number {
    let puntosTotales: number = 0;
    this.lista_tareas.controls.forEach(control => {
      if (control.valid)
        puntosTotales += control.value['valor']
    })
    this.comprension_auditiva.puntos_conseguidos = puntosTotales
    return puntosTotales
  }

  private extractForm(): void {
    this.comprension_auditiva = {
      corrector: this.form.value['corrector'],
      observaciones: this.form.value['observaciones'],
      lista_tareas: this.form.value['lista_tareas'],
      puntuacion_maxima: this.puntuacion_maxima,
      puntos_conseguidos: this.calcularPuntosTotales(),
      porcentaje: this.calcularPorcentaje()
    }
  }
}
