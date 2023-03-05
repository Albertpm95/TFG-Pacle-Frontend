import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { API_ENDPOINTS } from '@constants';
import { Convocatoria } from '@models/convocatoria';
import { ApiService } from '@services/api.service';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListConvocatoriaComponent {
  displayedColumns: string[] = ['lenguaje', 'tipo', 'fecha', 'estado', 'id_convocatoria', 'acciones']
  dataSource: MatTableDataSource<Convocatoria> = new MatTableDataSource()

  listLoaded: boolean = false;
  api_endpoints = API_ENDPOINTS

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.initializeList()
  }
  private initializeList(): void {
    this.apiService.getConvocatorias().subscribe((convocatorias) => {
      console.log('Lista convocatorias subscription: ', convocatorias)
      if (convocatorias) {
        this.dataSource = new MatTableDataSource(convocatorias)
        this.listLoaded = true
      }
    })
  }
  editarConvocatoria(convocatoria: Convocatoria) {
    console.log('Editar acta: ', convocatoria)
  }

  public cambiarEstadoConvocatoria(convocatoria: Convocatoria): void {
    if (convocatoria.id_convocatoria)
      this.apiService.cambiarEstadoConvocatoria(convocatoria.id_convocatoria, !convocatoria.estado)
  }
}
