import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Tipo } from '@models/tipo';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.scss']
})
export class TiposComponent {

  nuevoTipoForm = new FormControl()
  tipos$: Observable<Tipo[]> = this.apiService.getTiposConvocatoria()

  constructor(private apiService: ApiService) { }

  public deleteTipoConvocatoria(idTipo: number) {
    this.apiService.deleteTipoConvocatoria(idTipo)
  }

  public addTipoConvocatoria() {
    this.nuevoTipoForm.valid ? this.apiService.addTipoConvocatoria(this.nuevoTipoForm.value) : ''
  }
}
