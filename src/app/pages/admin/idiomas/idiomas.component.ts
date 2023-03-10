import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Lenguaje } from '@models/lenguaje';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.scss']
})

export class IdiomasComponent {

  nuevoIdiomaForm = new FormControl()
  idiomas$: Observable<Lenguaje[]> = this.apiService.getIdiomasConvocatoria()

  constructor(private apiService: ApiService) { }

  public deleteIdiomaConvocatoria(id_lenguaje: number | undefined) {
    if (id_lenguaje)
      this.apiService.deleteIdiomaConvocatoria(id_lenguaje)
  }

  public addIdiomaConvocatoria() {
    this.nuevoIdiomaForm.valid ? this.apiService.addIdiomaConvocatoria(this.nuevoIdiomaForm.value) : ''
  }
}
