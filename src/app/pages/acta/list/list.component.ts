import { Component } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { COMPONENTS, MODULES } from '@constants'
import { Acta } from '@models/acta'
import { ApiService } from '@services/api.service'
import { Subject, takeUntil } from 'rxjs'
@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  displayed_columns: string[] = ['idActa', 'alumno', 'convocatoria', 'fecha', 'resultado', 'acciones']
  data_source: MatTableDataSource<Acta> = new MatTableDataSource()

  list_loaded: boolean = false;
  edit_route = '/' + MODULES.ACTA + '/' + COMPONENTS.EDITION

  private destroy$: Subject<boolean> = new Subject<boolean>() // TODO Review

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.initializeList()
  }
  private initializeList(): void {
    this.apiService.getActas().pipe(takeUntil(this.destroy$)).subscribe((actas) => {
      console.log(actas)
      if (actas) {
        this.data_source = new MatTableDataSource(actas)
        if (actas.length)
          this.list_loaded = true
      }
    })
  }
}
