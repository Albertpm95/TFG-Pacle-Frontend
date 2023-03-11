import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComprensionAuditiva } from '@models/comprension_auditiva';
import { FakeDB } from '@models/fake-db';
import { Usuario } from '@models/usuario';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'comprension-auditiva',
  templateUrl: './comprension-auditiva.component.html',
  styleUrls: ['./comprension-auditiva.component.scss']
})
export class ComprensionAuditivaComponent {

  @Input() comprensionAuditiva: ComprensionAuditiva = FakeDB.comprensionAuditivaFake

  loading: boolean = true
  form: FormGroup = new FormGroup({})

  corrector$: Observable<Usuario[]> = this.apiService.getUsuarios()

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }
  ngOnInit() {
    this.comprensionAuditiva.id_comprension_auditiva ? this.loadForm() : this.initializeNewForm()
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
        valor: new FormControl(tarea.valor, Validators.required)
      })
      this.listaTareas.push(tareaForm)
    })

  }
  public get listaTareas() {
    return this.form.get('listaTareas') as FormArray;
  }

  public save(): void {
    if (this.form.valid) {
      let comprensionAuditiva = this.extractForm()
      this.apiService.updateComprensionAuditiva(comprensionAuditiva)
    }
  }

  private extractForm(): ComprensionAuditiva {
    let comprensionAuditiva: ComprensionAuditiva = {
      corrector: this.form.value['corrector'],
      observaciones: this.form.value['observaciones'],
      listaTareas: this.form.value['listaTareas'],
    }
    return comprensionAuditiva
  }
}
