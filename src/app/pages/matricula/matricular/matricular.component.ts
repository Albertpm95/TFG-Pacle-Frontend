import { Component } from '@angular/core'
import { Alumno } from '@models/alumno'
import { ConvocatoriaDB } from '@models/convocatoria'
import { ApiService } from '@services/api.service'

@Component({
  selector: 'app-matricular',
  templateUrl: './matricular.component.html',
  styleUrls: ['./matricular.component.scss']
})
export class MatricularComponent {
  listadoAlumnos$ = this.apiService.getAlumnos()
  listadoConvocatorias$ = this.apiService.getConvocatorias()
  constructor(private apiService: ApiService) {}

  matricular(alumno: Alumno, convocatoria: ConvocatoriaDB): void {
    this.apiService.matricularAlumno(alumno, convocatoria)
  }
}
