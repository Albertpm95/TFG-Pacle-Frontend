import { Component } from '@angular/core'
import { MatTable, MatTableDataSource } from '@angular/material/table'
import { Acta } from '@models/acta'
import { ApiService } from '@services/api.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListActaComponent {
  displayedColumns: string[] = ['lenguaje', 'tipo', 'fecha', 'activa']
  dataSource: MatTableDataSource<Acta> = new MatTableDataSource()

  constructor(private apiService: ApiService) {
    this.initializeForm()
  }

  private initializeForm(): void {
    this.apiService.getActas().subscribe((actas) => {
      if (actas) {
        this.dataSource = new MatTableDataSource(actas)
      }
    })
  }
  editarActa(acta: Acta) {
    console.log('Editar acta: ', acta)
  }

  cambiarStatus(acta: Acta) {
    console.log('Cambiar estado acta ', acta)
  }
}
