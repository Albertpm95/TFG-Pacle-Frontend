import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { COMPONENTS, CONSTANTS, MODULES } from '@constants';
import { Horario } from '@models/horario';
import { Lenguaje } from '@models/lenguaje';
import { Nivel } from '@models/nivel';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent {
  constants = CONSTANTS
  convocatoriaForm: FormGroup = new FormGroup('')

  creating: boolean = true
  loading: boolean = true
  listaLenguajesConvocatoria$: Observable<Lenguaje[]> = this.apiService.getLenguajesConvocatoria()
  listaHorariosConvocatoria$: Observable<Horario[]> = this.apiService.getHorariosConvocatoria()
  listaNivelesConvocatoria$: Observable<Nivel[]> = this.apiService.getNivelesConvocatoria()
  listRoute = '/' + MODULES.CONVOCATORIA + '/' + COMPONENTS.LIST

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private activactedRoute: ActivatedRoute) { }

  ngOnInit(): void { this.activactedRoute.snapshot.params['idConvocatoria'] ? this.loadForm(this.activactedRoute.snapshot.params['idConvocatoria']) : this.initializeNewForm() }

  private initializeNewForm(): void {
    this.convocatoriaForm = this.formBuilder.group({
      fechaParcial: [Date.now, Validators.required], // Date sin el horario
      horarioParcial: ['', Validators.required],
      lenguaje: ['', Validators.required],
      nivel: ['', Validators.required],
      comprensionAuditiva: this.formBuilder.group({ maxComprensionAuditiva: [0, Validators.required], listaTareas: this.formBuilder.array([]) }),
      comprensionLectora: this.formBuilder.group({ maxComprensionLectora: [0, Validators.required], listaTareas: this.formBuilder.array([]) }),
      expresionEscrita: this.formBuilder.group({ maxExpresionEscrita: [0, Validators.required], listaTareas: this.formBuilder.array([]) }),
      expresionOral: this.formBuilder.group({ maxExpresionOral: [0, Validators.required], listaTareas: this.formBuilder.array([]) }),
    })
    this.creating = false
    this.loading = false
  }

  private loadForm(idConvocatoria: number): void {
    this.apiService.getConvocatoria(idConvocatoria).subscribe(convocatoria => {
      this.convocatoriaForm = this.formBuilder.group({
        fechaParcial: [convocatoria.fecha, Validators.required], // Date sin el horario
        horarioParcial: [convocatoria.horario.horario, Validators.required],
        lenguaje: [convocatoria.lenguaje.lenguaje, Validators.required],
        nivel: ['', Validators.required],
        comprensionAuditiva: this.formBuilder.group({ maxComprensionAuditiva: [convocatoria.maxComprensionAuditiva, Validators.required], listaTareas: this.formBuilder.array([]) }),
        comprensionLectora: this.formBuilder.group({ maxComprensionLectora: [convocatoria.maxComprensionAuditiva, Validators.required], listaTareas: this.formBuilder.array([]) }),
        expresionEscrita: this.formBuilder.group({ maxExpresionEscrita: [convocatoria.maxComprensionAuditiva, Validators.required], listaTareas: this.formBuilder.array([]) }),
        expresionOral: this.formBuilder.group({ maxExpresionOral: [convocatoria.maxComprensionAuditiva, Validators.required], listaTareas: this.formBuilder.array([]) }),
      })
      this.creating = false
      this.loading = false
    })
  }

  public addTareaComprensionAuditiva() {
    let tarea = this.formBuilder.group({ nombreTarea: new FormControl(CONSTANTS.NOMBRE_TAREA_DEFECTO, Validators.required), valor: new FormControl(0, [Validators.required, Validators.min(0)]) });
    this.listaTareasComprensionAuditiva.push(tarea);
  }
  public addTareaComprensionLectora() {
    let tarea = this.formBuilder.group({ nombreTarea: new FormControl(CONSTANTS.NOMBRE_TAREA_DEFECTO, Validators.required), valor: new FormControl(0, [Validators.required, Validators.min(0)]) });
    this.listaTareasComprensionLectora.push(tarea);
  }
  public addTareaExpresionEscrita() {
    let tarea = this.formBuilder.group({ nombreTarea: new FormControl(CONSTANTS.NOMBRE_TAREA_DEFECTO, Validators.required), valor: new FormControl(0, [Validators.required, Validators.min(0)]) });
    this.listaTareasExpresionEscrita.push(tarea);
  }
  public addTareaExpresionOral() {
    let tarea = this.formBuilder.group({ nombreTarea: new FormControl(CONSTANTS.NOMBRE_TAREA_DEFECTO, Validators.required), valor: new FormControl(0, [Validators.required, Validators.min(0)]) });
    this.listaTareasExpresionOral.push(tarea);
  }

  public deleteTareaComprensionAuditiva(index: number): void { this.listaTareasComprensionLectora.removeAt(index); }
  public deleteTareaComprensionLectora(index: number): void { this.listaTareasComprensionLectora.removeAt(index); }
  public deleteTareaExpresionEscrita(index: number): void { this.listaTareasComprensionLectora.removeAt(index); }
  public deleteTareaExpresionOral(index: number): void { this.listaTareasComprensionLectora.removeAt(index); }

  public get listaTareasComprensionAuditiva() { return this.convocatoriaForm.get('comprensionAuditiva')?.get('listaTareas') as FormArray; }
  public get listaTareasComprensionLectora() { return this.convocatoriaForm.get('comprensionLectora')?.get('listaTareas') as FormArray; }
  public get listaTareasExpresionEscrita() { return this.convocatoriaForm.get('expresionEscrita')?.get('listaTareas') as FormArray; }
  public get listaTareasExpresionOral() { return this.convocatoriaForm.get('expresionOral')?.get('listaTareas') as FormArray; }

  public saveConvocatoria(): void {
    this.loading = true
    if (this.convocatoriaForm.valid) {
      let date_string = this.convocatoriaForm.controls['fechaParcial'].value
      let hora_parcial = this.convocatoriaForm.controls['horarioParcial'].value.split(':')
      let fechaParcial = new Date(date_string)
      fechaParcial.setHours(hora_parcial[0])
      fechaParcial.setMinutes(hora_parcial[1])
      /*let convocatoria: Convocatoria
      this.apiService.updateConvocatoria(convocatoria).subscribe(convocatoria => {
        console.log(convocatoria)
        if (convocatoria.idConvocatoria)
          this.router.navigate([this.listRoute])
      })
      */
    }
  }
}
