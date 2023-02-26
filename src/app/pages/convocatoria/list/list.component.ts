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

  listLoaded: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.initializeList()
  }
  private initializeList(): void {
    this.apiService.getConvocatorias().subscribe((convocatorias) => {
      if (convocatorias) {
        this.dataSource = new MatTableDataSource(convocatorias)
        this.listLoaded = true
      }
    })
  }
  editarConvocatoria(convocatoria: Convocatoria) {
    console.log('Editar acta: ', convocatoria)
  }
}
