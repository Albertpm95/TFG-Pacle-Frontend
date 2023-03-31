import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { COMPONENTS, MODULES } from '@constants';
import { Rol } from '@models/rol';
import { Usuario } from '@models/usuario';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent {

  usuarioDetailsForm: FormGroup = new FormGroup('')
  usuario: Usuario | undefined
  loading: boolean = true
  listRoute = '/' + MODULES.USUARIO + '/' + COMPONENTS.LIST

  listaRolesUsuario$: Observable<Rol[]> = this.apiService.getRolesUsuario()

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private activactedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let idUsuario = this.activactedRoute.snapshot.params['idUsuario']
    idUsuario ? this.loadForm(idUsuario) : this.initializeForm()
  }

  private initializeForm(): void {
    this.usuarioDetailsForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      rol: ['', Validators.required],
      estado: ['', Validators.required],
      username: ['', Validators.required],
    })
    this.loading = false;
  }

  private loadForm(idUsuario: number): void {

  }
}
