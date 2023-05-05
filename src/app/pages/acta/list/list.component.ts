import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { COMPONENTS, MODULES } from '@constants'
import { ActaDB } from '@models/acta'
import { ApiService } from '@services/api.service'
import { Subject, takeUntil } from 'rxjs'
@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  displayed_columns: string[] = ['idActa', 'alumno', 'convocatoria', 'fecha', 'resultado', 'acciones']
  data_source: MatTableDataSource<ActaDB> = new MatTableDataSource()

  list_loaded = false
  edit_route = '/' + MODULES.ACTA + '/' + COMPONENTS.EDITION

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.initializeList()
  }
  private initializeList(): void {
    this.apiService
      .getActas()
      .pipe(takeUntil(this.destroy$))
      .subscribe((actas) => {
        if (actas) {
          this.data_source = new MatTableDataSource(actas)
          if (actas.length) this.list_loaded = true
        }
      })
  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }
}
