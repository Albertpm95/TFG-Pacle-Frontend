import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Convocatoria } from '@models/convocatoria';
import { ApiService } from '@services/api.service';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListConvocatoriaComponent {
  displayedColumns: string[] = ['lenguaje', 'tipo', 'fecha', 'activa']
  dataSource: MatTableDataSource<Convocatoria> = new MatTableDataSource()

  constructor(private apiService: ApiService) {
    this.initializeForm()
  }

  private initializeForm(): void {
    this.apiService.getConvocatorias().subscribe((actas) => {
      if (actas) {
        this.dataSource = new MatTableDataSource(actas)
      }
    })
  }
  editarConvocatoria(convocatoria: Convocatoria) {
    console.log('Editar acta: ', convocatoria)
  }
}
