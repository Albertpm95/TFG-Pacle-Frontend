import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { COMPONENTS, MODULES } from '@constants';
import { Usuario } from '@models/usuario';
import { ApiService } from '@services/api.service';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  displayed_columns: string[] = ['id_usuario', 'username', 'nombre', 'apellidos', 'estado', 'rol', 'acciones']
  data_source: MatTableDataSource<Usuario> = new MatTableDataSource()

  list_loaded: boolean = false;
  edit_route = '/' + MODULES.USUARIO + '/' + COMPONENTS.EDITION

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.initializeList()
  }
  private initializeList(): void {
    this.apiService.getUsuarios().subscribe((usuarios) => {
      if (usuarios) {
        console.log(usuarios)
        this.data_source = new MatTableDataSource(usuarios)
        if (usuarios.length)
          this.list_loaded = true
      }
    })
  }
  public cambiarEstadoUsuario(usuario: Usuario): void {
    if (usuario.id_usuario)
      this.apiService.cambiarEstadoConvocatoria(usuario.id_usuario, !usuario.estado)
  }
}
