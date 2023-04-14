import { Component, Input } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { CONSTANTS } from '@constants'

import { Comprension } from '@models/comprension'
import { Tarea } from '@models/correccion'
import { Usuario } from '@models/usuario'
import { ApiService } from '@services/api.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'comprension-auditiva',
  templateUrl: './comprension-auditiva.component.html',
  styleUrls: ['./comprension-auditiva.component.scss']
})
export class ComprensionAuditivaComponent {
  @Input() comprensionAuditiva!: Comprension
  @Input() puntuacionMaxima!: number

  loading: boolean = true
  form: FormGroup = new FormGroup({})

  corrector$: Observable<Usuario[]> = this.apiService.getUsuarios()

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {}

  ngOnInit() {
    this.comprensionAuditiva.idComprension ? this.loadForm() : this.initializeNewForm()
    this.comprensionAuditiva.puntuacionMaxima = this.puntuacionMaxima
    this.loadTareas()
  }

  private initializeNewForm() {
    this.form = this.formBuilder.group({
      observaciones: [''],
      corrector: ['', Validators.required],
      listaTareas: this.formBuilder.array([])
    })
    this.loading = false
  }

  private loadForm() {
    this.loading = false
  }

  private loadTareas() {
    this.comprensionAuditiva.correccion.listaTareas.forEach((tarea: Tarea) => {
      let tareaForm = this.formBuilder.group({
        nombreTarea: new FormControl(tarea.nombreTarea, Validators.required),
        valor: new FormControl(tarea.valor, [Validators.required, Validators.min(0)])
      })
      this.listaTareas.push(tareaForm)
    })
  }

  public get listaTareas() {
    return this.form.get('listaTareas') as FormArray
  }

  public save(): void {
    if (this.form.valid) {
      this.extractForm()
      this.apiService.updateComprension(this.comprensionAuditiva)
    }
  }

  private calcularPorcentaje(): number {
    return (
      (this.comprensionAuditiva.puntosConseguidos * CONSTANTS.PORCIENTO) / this.comprensionAuditiva.puntuacionMaxima
    )
  }

  private calcularPuntosTotales(): number {
    let puntosTotales: number = 0
    this.listaTareas.controls.forEach((control) => {
      if (control.valid) puntosTotales += control.value['valor']
    })
    this.comprensionAuditiva.puntosConseguidos = puntosTotales
    return puntosTotales
  }

  private extractForm(): void {
    this.comprensionAuditiva = {
      correccion: this.form.value['coreccion'],
      tipo: 'Auditiva',
      observaciones: this.form.value['observaciones'],
      puntuacionMaxima: this.puntuacionMaxima,
      puntosConseguidos: this.calcularPuntosTotales(),
      porcentaje: this.calcularPorcentaje()
    }
  }
}
