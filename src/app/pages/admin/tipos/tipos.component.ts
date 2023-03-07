import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.scss']
})
export class TiposComponent {

  nuevoTipoForm = new FormControl()
  tipos$ = this.apiService.getTiposConvocatoria()

  constructor(private apiService: ApiService) {

  }
}
