import { Component, Input } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ParteCorregida } from '@models/parte'
import { Usuario } from '@models/usuario'
import { ApiService } from '@services/api.service'
import { Observable, Subject } from 'rxjs'

@Component({
  selector: 'parte-acta',
  templateUrl: './parte.component.html',
  styleUrls: ['./parte.component.scss']
})
export class ParteComponent {
  @Input() parte: ParteCorregida | undefined

  loading: boolean = true
  form: FormGroup = new FormGroup({})

  corrector$: Observable<Usuario[]> = this.apiService.getUsuarios()

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {}

  ngOnInit() {
    this.parte?.idParteCorregida ? this.loadForm() : this.initializeNewForm()
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
    }
  }

  private calcularPorcentaje(): number {
    return 0
  }

  private calcularPuntosTotales(): number {
    let puntosTotales: number = 0
    this.listaTareas.controls.forEach((control) => {
      if (control.valid) puntosTotales += control.value['valor']
    })

    return 0
  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }
}
