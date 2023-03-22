import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Genero } from '@models/genero';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.scss']
})

export class GenerosComponent {

  nuevoGeneroForm = new FormControl()
  generos$: Observable<Genero[]> = this.apiService.getGenerosConvocatoria()

  constructor(private apiService: ApiService) { }

  public deleteGeneroConvocatoria(idLenguaje: number | undefined) {
    if (idLenguaje)
      this.apiService.deleteGeneroConvocatoria(idLenguaje)
  }

  public addGeneroConvocatoria() {
    this.nuevoGeneroForm.valid ? this.apiService.addGeneroConvocatoria(this.nuevoGeneroForm.value) : ''
  }
}
