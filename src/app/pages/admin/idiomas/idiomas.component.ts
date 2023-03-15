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

  public deleteIdiomaConvocatoria(idLenguaje: number | undefined) {
    if (idLenguaje)
      this.apiService.deleteIdiomaConvocatoria(idLenguaje)
  }

  public addIdiomaConvocatoria() {
    this.nuevoIdiomaForm.valid ? this.apiService.addIdiomaConvocatoria(this.nuevoIdiomaForm.value) : ''
  }
}
