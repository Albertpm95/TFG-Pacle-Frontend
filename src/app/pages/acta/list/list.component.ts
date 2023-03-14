import { Component } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { COMPONENTS, MODULES } from '@constants'
import { Acta } from '@models/acta'
import { ApiService } from '@services/api.service'
@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  displayed_columns: string[] = ['id_acta', 'alumno', 'convocatoria', 'resultado', 'acciones']
  data_source: MatTableDataSource<Acta> = new MatTableDataSource()

  list_loaded: boolean = false;
  edit_route = '/' + MODULES.ACTA + '/' + COMPONENTS.EDITION

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.initializeList()
  }
  private initializeList(): void {
    this.apiService.getActas().subscribe((actas) => {
      console.log(actas)
      if (actas) {
        this.data_source = new MatTableDataSource(actas)
        if (actas.length)
          this.list_loaded = true
      }
    })
  }
}
