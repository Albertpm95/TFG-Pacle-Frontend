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

  @Input() comprensionAuditiva!: ComprensionAuditiva
  @Input() puntuacionMaxima!: number

  loading: boolean = true
  form: FormGroup = new FormGroup({})

  corrector$: Observable<Usuario[]> = this.apiService.getUsuarios()

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
    this.comprensionAuditiva.id_comprension_auditiva ? this.loadForm() : this.initializeNewForm()
    this.comprensionAuditiva.puntuacionMaximaParte = this.puntuacionMaxima
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
    this.comprensionAuditiva.listaTareas.forEach(tarea => {
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
      this.apiService.updateComprensionAuditiva(this.comprensionAuditiva)
    }
  }

  private calcularPorcentaje(): number {
    return this.comprensionAuditiva.puntosConseguidos * CONSTANTS.PORCIENTO / this.comprensionAuditiva.puntuacionMaximaParte
  }

  private calcularPuntosTotales(): number {
    let puntosTotales: number = 0;
    this.listaTareas.controls.forEach(control => {
      if (control.valid)
        puntosTotales += control.value['valor']
    })
    this.comprensionAuditiva.puntosConseguidos = puntosTotales
    return puntosTotales
  }

  private extractForm(): void {
    this.comprensionAuditiva = {
      corrector: this.form.value['corrector'],
      observaciones: this.form.value['observaciones'],
      listaTareas: this.form.value['listaTareas'],
      puntuacionMaximaParte: this.puntuacionMaxima,
      puntosConseguidos: this.calcularPuntosTotales(),
      porcentaje: this.calcularPorcentaje()
    }
  }
}
