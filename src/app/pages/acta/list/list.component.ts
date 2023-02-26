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

  constructor() { }

  public editarActa(acta: Acta): void {

  }

  public cambiarStatusActa(acta: Acta): void {

  }
}
