import { Component } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Acta } from '@models/acta'
import { API_ENDPOINTS } from '@constants'

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListActaComponent {
  displayedColumns: string[] = ['lenguaje', 'tipo', 'fecha', 'activa']
  dataSource: MatTableDataSource<Acta> = new MatTableDataSource()

  acta_edit_route = API_ENDPOINTS.ACTA_EDIT

  constructor() { }

  public editarActa(acta: Acta): void {

  }

  public cambiarStatusActa(acta: Acta): void {

  }
}
