import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { COMPONENTS, CONSTANTS, MODULES } from '@constants';
import { Alumno } from '@models/alumno';

import { ApiService } from '@services/api.service';


@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditionComponent {

  constants = CONSTANTS
  alumnoNuevoForm: FormGroup = new FormGroup('')
  alumno: Alumno | undefined
  loading: boolean = true
  list_route = '/' + MODULES.CONVOCATORIA + '/' + COMPONENTS.LIST

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private activactedRoute: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    let idAlumno = this.activactedRoute.snapshot.params['idAlumno']

    idAlumno ? this.loadForm(idAlumno) : this.initializeForm()
  }

  private initializeForm(): void {
    this.alumnoNuevoForm = this.formBuilder.group({
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
    })
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

