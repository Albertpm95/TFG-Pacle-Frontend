import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Idioma } from '@models/idioma';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.scss']
})

export class IdiomasComponent {

  nuevoIdiomaForm = new FormControl()
  idiomas$: Observable<Idioma[]> = this.apiService.getIdiomasConvocatoria()

  constructor(private apiService: ApiService) { }

  public deleteIdiomaConvocatoria(idIdioma: number) {
    this.apiService.deleteIdiomaConvocatoria(idIdioma)
  }

  public addIdiomaConvocatoria() {
    this.nuevoIdiomaForm.valid ? this.apiService.addIdiomaConvocatoria(this.nuevoIdiomaForm.value) : ''
  }
}
