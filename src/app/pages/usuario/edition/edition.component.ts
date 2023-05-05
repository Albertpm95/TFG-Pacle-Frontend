import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { COMPONENTS, MODULES } from '@constants'
import { Rol } from '@models/rol'
import { Usuario } from '@models/usuario'
import { ApiService } from '@services/api.service'
import { Observable, Subject, takeUntil } from 'rxjs'

@Component({
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent {
  usuarioDetailsForm: FormGroup = new FormGroup('')
  loading: boolean = true
  usuario: Usuario | undefined
  listRoute = '/' + MODULES.USUARIO + '/' + COMPONENTS.LIST

  listaRolesUsuario$: Observable<Rol[]> = this.apiService.getRolesUsuario()

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private activactedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let idUsuario = this.activactedRoute.snapshot.params['idUsuario']
    idUsuario ? this.loadForm(idUsuario) : this.initializeForm()
  }

  private initializeForm(): void {
    this.usuarioDetailsForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      rol: ['', Validators.required],
      estado: [true],
      username: ['', Validators.required]
    })
    this.loading = false
  }

  private loadForm(idUsuario: string): void {
    this.apiService
      .getUsuarioID(idUsuario)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Usuario) => {
        this.usuarioDetailsForm = this.formBuilder.group({
          nombre: [response.nombre, Validators.required],
          apellidos: [response.apellidos, Validators.required],
          rol: [response.rol, Validators.required],
          estado: [response.estado],
          username: [response.username, Validators.required]
        })
        this.usuario = response
        this.loading = false
      })
  }

  public save(idUsuario?: number): void {
    if (this.usuarioDetailsForm.valid) {
      let usuario_nuevo: Usuario = {
        nombre: this.usuarioDetailsForm.controls['nombre'].value,
        apellidos: this.usuarioDetailsForm.controls['apellidos'].value,
        estado: this.usuarioDetailsForm.controls['estado'].value,
        idUsuario: idUsuario,
        rol: this.usuarioDetailsForm.controls['rol'].value,
        username: this.usuarioDetailsForm.controls['username'].value
      }
      idUsuario
        ? this.apiService
            .updateUsuario(usuario_nuevo)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
              this.router.navigateByUrl(MODULES.USUARIO + '/' + COMPONENTS.LIST)
            })
        : this.apiService
            .addUsuario(usuario_nuevo)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
              this.router.navigateByUrl(MODULES.USUARIO + '/' + COMPONENTS.LIST)
            })
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }
}
