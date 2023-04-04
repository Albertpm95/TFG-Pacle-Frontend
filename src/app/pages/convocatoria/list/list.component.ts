import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { COMPONENTS, MODULES } from '@constants';
import { Convocatoria } from '@models/convocatoria';
import { ApiService } from '@services/api.service';

@Component({
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {
    displayed_columns: string[] = ['idConvocatoria', 'lenguaje', 'nivel', 'fecha', 'horario', 'estado', 'maxComprensionAuditiva', 'maxComprensionLectora', 'maxExpresionEscrita', 'maxExpresionOral', 'acciones']
    data_source: MatTableDataSource<Convocatoria> = new MatTableDataSource()

    list_loaded: boolean = false;
    edit_route = '/' + MODULES.CONVOCATORIA + '/' + COMPONENTS.EDITION
    alumno_list_route = '/' + MODULES.ALUMNO + '/' + COMPONENTS.LIST

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.initializeList()
    }
    private initializeList(): void {
        this.apiService.getConvocatorias().subscribe((convocatorias) => {
            if (convocatorias) {
                console.log(convocatorias)
                this.data_source = new MatTableDataSource(convocatorias)
                if (convocatorias.length)
                    this.list_loaded = true
            }
        })
    }
    public cambiarEstadoConvocatoria(convocatoria: Convocatoria): void {
        if (convocatoria.idConvocatoria)
            this.apiService.cambiarEstadoConvocatoria(convocatoria.idConvocatoria, !convocatoria.estado)
    }
}
