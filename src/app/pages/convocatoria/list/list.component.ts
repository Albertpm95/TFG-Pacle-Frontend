import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { COMPONENTS } from '@constants';
import { Convocatoria } from '@models/convocatoria';
import { ApiService } from '@services/api.service';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  displayedColumns: string[] = ['lenguaje', 'fecha', 'horario', 'estado', 'id_convocatoria', 'acciones']
  dataSource: MatTableDataSource<Convocatoria> = new MatTableDataSource()

  listLoaded: boolean = false;
  edit_route = COMPONENTS.EDITION

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.initializeList()
  }
  private initializeList(): void {
    this.apiService.getConvocatorias().subscribe((convocatorias) => {
      console.log(convocatorias)
      if (convocatorias) {
        this.dataSource = new MatTableDataSource(convocatorias)
        if (convocatorias.length)
          this.listLoaded = true
      }
    })
  }
  public cambiarEstadoConvocatoria(convocatoria: Convocatoria): void {
    if (convocatoria.id_convocatoria)
      this.apiService.cambiarEstadoConvocatoria(convocatoria.id_convocatoria, !convocatoria.estado)
  }
}
