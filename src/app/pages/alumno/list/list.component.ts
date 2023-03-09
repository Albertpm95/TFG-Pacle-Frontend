import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { COMPONENTS } from '@constants';
import { Alumno } from '@models/alumno';
import { ApiService } from '@services/api.service';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  displayedColumns: string[] = ['dni', 'id_alumno', 'nombre', 'apellidos', 'acciones']
  dataSource: MatTableDataSource<Alumno> = new MatTableDataSource()
  listLoaded: boolean = false;
  edit_route = COMPONENTS.EDITION

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.initializeList()
  }
  private initializeList(): void {
    this.apiService.getAlumnos().subscribe((alumnos) => {
      console.log(alumnos)
      if (alumnos) {
        this.dataSource = new MatTableDataSource(alumnos)
        if (alumnos.length)
          this.listLoaded = true
      }
    })
  }
}
