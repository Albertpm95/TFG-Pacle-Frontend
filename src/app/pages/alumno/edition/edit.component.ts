import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { COMPONENTS, MODULES } from '@constants';
import { Alumno } from '@models/alumno';
import { Genero } from '@models/genero';

import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';


@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditionComponent {

  alumnoNuevoForm: FormGroup = new FormGroup('')
  alumno: Alumno | undefined
  loading: boolean = true
  listRoute = '/' + MODULES.CONVOCATORIA + '/' + COMPONENTS.LIST

  listaGenerosAlumno$: Observable<Genero[]> = this.apiService.getGenerosAlumno()

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private activactedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    let idAlumno = this.activactedRoute.snapshot.params['idAlumno']
    idAlumno ? this.loadForm(idAlumno) : this.initializeForm()
  }

  private initializeForm(): void {
    this.alumnoNuevoForm = this.formBuilder.group({
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      genero: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      colectivoUV: ['', Validators.required],
      pruebaAdaptada: ['', Validators.required],
    })
    this.loading = false;
  }

  private loadForm(idAlumno: number): void {
    this.apiService.getAlumnoID(idAlumno).subscribe(alumno => {
      this.alumno = alumno
      this.alumnoNuevoForm = this.formBuilder.group({
        dni: [alumno.dni, Validators.required],
        nombre: [alumno.nombre, Validators.required],
        apellidos: [alumno.apellidos, Validators.required],
        idAlumno: [alumno.idAlumno, Validators.required]
      })
    })
  }

  public saveAlumno(): void {
    this.loading = true
    if (this.alumnoNuevoForm.valid) {
    }
    this.loading = false
  }
}

