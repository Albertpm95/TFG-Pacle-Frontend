import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { ParteCorregidaDB, ParteCorregidaNueva } from '@models/parte'
import { Usuario } from '@models/usuario'
import { ApiService } from '@services/api.service'
import { Observable, Subject } from 'rxjs'

@Component({
  selector: 'app-parte-acta',
  templateUrl: './parte.component.html',
  styleUrls: ['./parte.component.scss']
})
export class ParteComponent implements OnInit, OnDestroy {
  @Input() parte: ParteCorregidaNueva | ParteCorregidaDB | undefined

  loading = true
  form: FormGroup = new FormGroup({})

  corrector$: Observable<Usuario[]> = this.apiService.getUsuarios()

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {}

  ngOnInit() {
    if (this.parte) {
      this.parte.parte ? this.loadForm() : this.initializeNewForm()
    }

    // this.loadTareas()
  }

  private initializeNewForm() {
    this.form = this.formBuilder.group({
      observaciones: [''],
      listaTareas: this.formBuilder.array([])
    })
    this.loading = false
  }

  private loadForm() {
    this.loading = false
  }

  private loadTareas() {
    /*
    this.parte?.tareas.forEach((tarea: any) => {
      let tareaForm = this.formBuilder.group({
        nombreTarea: new FormControl(tarea.nombreTarea, Validators.required),
        valor: new FormControl(tarea.puntuacion, [Validators.required, Validators.min(0)])
      })
      this.listaTareas.push(tareaForm)
    })
    */
  }

  public get listaTareas() {
    return this.form.get('tareas') as FormArray
  }

  public save(): void {
    if (this.form.valid) {
      console.log('Not implemented')
    }
  }

  private calcularPorcentaje(): number {
    return 0
  }

  private calcularPuntosTotales(): number {
    let puntosTotales = 0
    this.listaTareas.controls.forEach((control) => {
      if (control.valid) puntosTotales += control.value['valor']
    })

    return puntosTotales
  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }
}
