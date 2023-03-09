import { Component } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { COMPONENTS } from '@constants'
import { Acta } from '@models/acta'
import { ApiService } from '@services/api.service'
@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  displayedColumns: string[] = ['id_acta', 'alumno', 'comprension', 'convocatoria', 'expresion', 'resultado', 'acciones']
  dataSource: MatTableDataSource<Acta> = new MatTableDataSource()


  listLoaded: boolean = false;
  edit_route = COMPONENTS.EDITION

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.initializeList()
  }
  private initializeList(): void {
    this.apiService.getActas().subscribe((actas) => {
      console.log(actas)
      if (actas) {
        this.dataSource = new MatTableDataSource(actas)
        if (actas.length)
          this.listLoaded = true
      }
    })
  }
}
