import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { COMPONENTS, MODULES } from '@constants';
import { Alumno } from '@models/alumno';
import { ApiService } from '@services/api.service';

@Component({
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {
    displayed_columns: string[] = ['dni', 'nombre', 'apellidos', 'fechaNacimiento', 'colectivoUV', 'genero', 'pruebaAdatada', 'acciones']
    data_source: MatTableDataSource<Alumno> = new MatTableDataSource()

    list_loaded: boolean = false;
    edit_route = '/' + MODULES.ALUMNO + '/' + COMPONENTS.EDITION

    constructor(private apiService: ApiService, private activactedRoute: ActivatedRoute) { }

    ngOnInit() {
        let idConvocatoria = this.activactedRoute.snapshot.params['idConvocatoria']
        idConvocatoria ? this.initializeFilteredListConvocatoria(idConvocatoria) : this.initializeList()
    }

    private initializeList(): void {
        this.apiService.getAlumnos().subscribe((alumnos: Alumno[]) => {
            if (alumnos) {
                this.data_source = new MatTableDataSource(alumnos)
                if (alumnos.length)
                    this.list_loaded = true
            }
        })
    }

    private initializeFilteredListConvocatoria(idConvocatoria: number): void {
        this.apiService.getAlumnosConvocatoria(idConvocatoria).subscribe((alumnos: Alumno[]) => {
            if (alumnos) {
                this.data_source = new MatTableDataSource(alumnos)
                if (alumnos.length)
                    this.list_loaded = true
            }
        })
    }
}
