import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Rol } from '@models/rol'
import { ApiService } from '@services/api.service'
import {
  Observable,
  Subject,
  catchError,
  finalize,
  takeUntil,
  throwError,
  throwIfEmpty,
} from 'rxjs'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent {
  nuevoRolForm = new FormControl()
  roles: Rol[] = []
  loading: boolean = true

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private apiService: ApiService) {
    this.nuevoRolForm.setValidators(Validators.required)
    this.apiService
      .getRolesUsuario()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Rol[]): Rol[] => (this.roles = response))
  }

  public addRolUsuario(): void {
    if (this.nuevoRolForm.valid) {
      let rol_nuevo: Rol = { rol: this.nuevoRolForm.value }
      this.loading = true
      this.apiService
        .addRolUsuario(rol_nuevo)
        .pipe(
          takeUntil(this.destroy$),
          catchError((error): Observable<never> => {
            console.error('Error fetching data from api:', error)
            return throwError(() => error)
          }),
          finalize(() => {
            this.loading = false
          }),
          throwIfEmpty(() => {
            console.log('Vacio')
          }),
        )
        .subscribe((response: Rol): void => {
          this.nuevoRolForm.reset()
          this.roles.push(response)
        })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
  }
}
