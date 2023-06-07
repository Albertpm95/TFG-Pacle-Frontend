import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '@services/api.service'
import { SnackbarService } from '@services/snackbar.service'
import { Observable, Subject, catchError, takeUntil, throwError } from 'rxjs'

@Component({
  selector: 'app-matricular',
  templateUrl: './matricular.component.html',
  styleUrls: ['./matricular.component.scss']
})
export class MatricularComponent {
  listadoAlumnos$ = this.apiService.getAlumnos()
  listadoConvocatorias$ = this.apiService.getConvocatorias()

  matriculaForm: FormGroup = new FormGroup('')

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService
  ) {
    this.matriculaForm = this.formBuilder.group({
      alumnoSeleccionado: ['', [Validators.required]],
      convocatoriaSeleccionada: ['', [Validators.required]]
    })
  }

  public matricular(): void {
    if (this.matriculaForm.valid)
      this.apiService
        .matricularAlumno(
          this.matriculaForm.get('alumnoSeleccionado')?.value,
          this.matriculaForm.get('convocatoriaSeleccionada')?.value
        )
        .pipe(
          takeUntil(this.destroy$),
          catchError((error): Observable<never> => {
            this.snackbarService.openSnackBar('El alumno ya esta matriculado en esa convocatoria.', 'X')
            return throwError(() => error)
          })
        )

        .subscribe((result) => {
          if (result) {
            console.log(result)
            this.snackbarService.openSnackBar('Se ha matriculado al alumno.', 'X')
          } else {
            this.snackbarService.openSnackBar('No se ha podido matricular al alumno.', 'X')
          }
        })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public compareFn(obj1: any, obj2: any) {
    // To make the mat-select load the value if updating convocatoria
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2
  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }
}

