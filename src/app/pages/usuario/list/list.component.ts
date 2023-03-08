import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { COMPONENTS } from '@constants';
import { Usuario } from '@models/usuario';
import { ApiService } from '@services/api.service';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  displayedColumns: string[] = ['apellidos', 'estado', 'id_usuario', 'nombre', 'rol', 'username', 'acciones']
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource()

  nuevoUsuarioForm = new FormControl()
  listLoaded: boolean = false;
  edit_route = COMPONENTS.EDITION

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.initializeList()
  }
  private initializeList(): void {
    this.apiService.getUsuarios().subscribe((usuarios) => {
      if (usuarios) {
        this.dataSource = new MatTableDataSource(usuarios)
        this.listLoaded = true
      }
    })
  }
  public cambiarEstadoUsuario(usuario: Usuario): void {
    if (usuario.id_usuario)
      this.apiService.cambiarEstadoConvocatoria(usuario.id_usuario, !usuario.estado)
  }
}
