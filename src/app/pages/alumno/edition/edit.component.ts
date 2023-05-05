import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { COMPONENTS, MODULES } from '@constants'
import { Alumno } from '@models/alumno'
import { ColectivoUV } from '@models/colectivouv'
import { Genero } from '@models/genero'
import { ApiService } from '@services/api.service'
import { Observable, Subject, catchError, finalize, takeUntil, throwError, throwIfEmpty } from 'rxjs'

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditionComponent implements OnInit {
  alumnoNuevoForm: FormGroup = new FormGroup('')
  alumno: Alumno | undefined
  loading = true

  listaGenerosAlumno$: Observable<Genero[]> = this.apiService.getGenerosAlumno()
  listaColectivosUVAlumno$: Observable<ColectivoUV[]> = this.apiService.getColectivosUV()

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private activactedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idAlumno = this.activactedRoute.snapshot.params['idAlumno']
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
      pruebaAdaptada: [false]
    })
    this.loading = false
  }

  private loadForm(idAlumno: number): void {
    this.apiService.getAlumnoID(idAlumno).subscribe((alumno: Alumno) => {
      this.alumnoNuevoForm = this.formBuilder.group({
        dni: [alumno.dni, Validators.required],
        nombre: [alumno.nombre, Validators.required],
        apellidos: [alumno.apellidos, Validators.required],
        direccion: [alumno.direccion, Validators.required],
        email: [alumno.email, Validators.required],
        telefono: [alumno.telefono, Validators.required],
        genero: [alumno.genero, Validators.required],
        fechaNacimiento: [alumno.fechaNacimiento, Validators.required],
        colectivoUV: [alumno.colectivoUV, Validators.required],
        pruebaAdaptada: [alumno.pruebaAdaptada]
      })
      this.alumno = alumno
      this.loading = false
    })
  }

  public saveAlumno(idAlumno?: number): void {
    this.loading = true
    if (this.alumnoNuevoForm.valid) {
      const _date: Date = new Date(this.alumnoNuevoForm.controls['fechaNacimiento'].value) as Date
      const alumno: Alumno = {
        nombre: this.alumnoNuevoForm.controls['nombre'].value,
        apellidos: this.alumnoNuevoForm.controls['apellidos'].value,
        colectivoUV: this.alumnoNuevoForm.controls['colectivoUV'].value,
        direccion: this.alumnoNuevoForm.controls['direccion'].value,
        dni: this.alumnoNuevoForm.controls['dni'].value,
        email: this.alumnoNuevoForm.controls['email'].value,
        fechaNacimiento: _date,
        genero: this.alumnoNuevoForm.controls['genero'].value,
        pruebaAdaptada: this.alumnoNuevoForm.controls['pruebaAdaptada'].value,
        telefono: this.alumnoNuevoForm.controls['telefono'].value,
        idAlumno: idAlumno
      }
      idAlumno
        ? this.apiService
            .updateAlumno(alumno)
            .pipe(
              takeUntil(this.destroy$),
              catchError((error): Observable<never> => {
                return throwError(() => error)
              }),
              finalize(() => {
                this.loading = false
              }),
              throwIfEmpty(() => {
                console.log('Vacio')
              })
            )
            .subscribe(() => {
              this.router.navigateByUrl(MODULES.ALUMNO + '/' + COMPONENTS.LIST)
            })
        : this.apiService
            .addAlumno(alumno)
            .pipe(
              takeUntil(this.destroy$),
              catchError((error): Observable<never> => {
                return throwError(() => error)
              }),
              finalize(() => {
                this.loading = false
              }),
              throwIfEmpty(() => {
                console.log('Vacio')
              })
            )
            .subscribe(() => {
              this.router.navigateByUrl(MODULES.ALUMNO + '/' + COMPONENTS.LIST)
            })
    }
    this.loading = false
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
  }
}
