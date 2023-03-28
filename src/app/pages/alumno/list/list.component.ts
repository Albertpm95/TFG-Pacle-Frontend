import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { COMPONENTS, MODULES } from '@constants';
import { Alumno } from '@models/alumno';
import { ApiService } from '@services/api.service';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  displayed_columns: string[] = ['dni', 'nombre', 'apellidos', 'fechaNacimiento', 'colectivoUV', 'genero', 'pruebaAdatada', 'acciones']
  data_source: MatTableDataSource<Alumno> = new MatTableDataSource()

  list_loaded: boolean = false;
  edit_route = '/' + MODULES.ALUMNO + '/' + COMPONENTS.EDITION

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.initializeList()
  }
  private initializeList(): void {
    this.apiService.getAlumnos().subscribe((alumnos) => {
      console.log(alumnos)
      if (alumnos) {
        this.data_source = new MatTableDataSource(alumnos)
        if (alumnos.length)
          this.list_loaded = true
      }
    })
  }
}
