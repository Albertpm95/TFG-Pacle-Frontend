import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Rol } from '@models/rol'
import { ApiService } from '@services/api.service'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent {
  nuevoRolForm = new FormControl()
  roles: Rol[] = []

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private apiService: ApiService) {
    this.nuevoRolForm.setValidators(Validators.required)
    this.apiService
      .getRolesUsuario()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Rol[]) => (this.roles = response))
  }

  public addRolUsuario() {
    if (this.nuevoRolForm.valid) {
      let rol_nuevo: Rol = { rol: this.nuevoRolForm.value }
      this.apiService
        .addRolUsuario(rol_nuevo)
        .pipe(takeUntil(this.destroy$))
        .pipe()
        .subscribe((response: Rol) => {
          this.nuevoRolForm.reset()
          this.roles.push(response)
        })
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }
}
