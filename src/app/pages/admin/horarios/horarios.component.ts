import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Horario } from '@models/horario';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent {

  nuevoHorarioForm = new FormControl()
  horarios$: Observable<Horario[]> = this.apiService.getHorariosConvocatoria()

  constructor(private apiService: ApiService) { }

  public deleteHorarioConvocatoria(idTipo: number) {
    this.apiService.deleteHorarioConvocatoria(idTipo)
  }

  public addHorarioConvocatoria() {
    console.log(this.nuevoHorarioForm.valid)
    this.nuevoHorarioForm.valid ? this.apiService.addHorarioConvocatoria(this.nuevoHorarioForm.value) : ''
  }
}
