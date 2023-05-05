import { Component, OnDestroy } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Rol } from '@models/rol'
import { ApiService } from '@services/api.service'
import { Subject, finalize, takeUntil } from 'rxjs'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnDestroy {
  nuevoRolForm = new FormControl()
  roles: Rol[] = []
  loading = true

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
      const rol_nuevo: Rol = { rol: this.nuevoRolForm.value }
      this.loading = true
      this.apiService
        .addRolUsuario(rol_nuevo)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            this.loading = false
          })
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
