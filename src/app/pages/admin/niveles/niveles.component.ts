import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Nivel } from '@models/nivel';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styleUrls: ['./niveles.component.scss']
})

export class NivelesComponent {

  nuevoNivelForm = new FormControl()
  niveles$: Observable<Nivel[]> = this.apiService.getNivelesConvocatoria()

  constructor(private apiService: ApiService) { }

  public deleteNivelConvocatoria(idLenguaje: number | undefined) {
    if (idLenguaje)
      this.apiService.deleteNivelConvocatoria(idLenguaje)
  }

  public addNivelConvocatoria() {
    this.nuevoNivelForm.valid ? this.apiService.addNivelConvocatoria(this.nuevoNivelForm.value) : ''
  }
}
