import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { COMPONENTS, MODULES } from '@constants';
import { Alumno } from '@models/alumno';
import { Convocatoria } from '@models/convocatoria';
import { AlumnosConvocatoria } from '@models/dictionaries';
import { ApiService } from '@services/api.service';
import { Subject, map, take, takeUntil } from 'rxjs';

@Component({
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {
    displayed_columns: string[] = ['dni', 'nombre', 'apellidos', 'fechaNacimiento', 'colectivoUV', 'genero', 'pruebaAdatada', 'acciones']
    data_source: MatTableDataSource<Alumno> = new MatTableDataSource()

    list_loaded: boolean = false;
    edit_route = '/' + MODULES.ALUMNO + '/' + COMPONENTS.EDITION
    correct_alumno_route = '/' + MODULES.ACTA + '/' + COMPONENTS.EDITION

    convocatoria: Convocatoria | undefined

    private destroy$: Subject<boolean> = new Subject<boolean>()

    constructor(private apiService: ApiService, private activactedRoute: ActivatedRoute) { }

    ngOnInit() {
        let idConvocatoriaString = this.activactedRoute.snapshot.paramMap.get('idConvocatoria')
        if (idConvocatoriaString)
            this.initializeFilteredListConvocatoria(+idConvocatoriaString)
        else
            this.initializeList()
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
        this.apiService.getAlumnosConvocatoria(idConvocatoria).pipe(take(1)).subscribe((mappedInfo: AlumnosConvocatoria) => {
            this.convocatoria = mappedInfo.convocatoria
            this.data_source = new MatTableDataSource(mappedInfo.alumnos)
            if (mappedInfo.alumnos.length)
                this.list_loaded = true
        })
    }

    public deleteAlumno(idAlumno: number): void {
        this.list_loaded = false
        idAlumno ? this.apiService.deleteAlumno(idAlumno).pipe(takeUntil(this.destroy$)).subscribe(() => {
            let indexAEliminar = this.data_source.data.findIndex(
                (alumno) => alumno.idAlumno === idAlumno,
            )
            if (indexAEliminar != -1)
                this.data_source.data.splice(indexAEliminar, 1)

            this.list_loaded = true
        }) : ''
    }


    ngOnDestroy() {
        this.destroy$.next(true)
    }
}
