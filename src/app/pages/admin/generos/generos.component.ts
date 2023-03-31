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
  generos$: Observable<Genero[]> = this.apiService.getGenerosAlumno()

  constructor(private apiService: ApiService) { }

  public deleteGeneroConvocatoria(idLenguaje: number | undefined) {
    if (idLenguaje)
      this.apiService.deleteGeneroAlumno(idLenguaje)
  }

  public addGeneroConvocatoria() {
    this.nuevoGeneroForm.valid ? this.apiService.addGeneroAlumno(this.nuevoGeneroForm.value) : ''
  }
}
