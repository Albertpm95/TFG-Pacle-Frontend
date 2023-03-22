import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Lenguaje } from '@models/lenguaje';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-lenguajes',
  templateUrl: './lenguajes.component.html',
  styleUrls: ['./lenguajes.component.scss']
})

export class LenguajesComponent {

  nuevoLenguajeForm = new FormControl()
  lenguajes$: Observable<Lenguaje[]> = this.apiService.getLenguajesConvocatoria()

  constructor(private apiService: ApiService) { }

  public deleteLenguajeConvocatoria(idLenguaje: number | undefined) {
    if (idLenguaje)
      this.apiService.deleteLenguajeConvocatoria(idLenguaje)
  }

  public addLenguajeConvocatoria() {
    this.nuevoLenguajeForm.valid ? this.apiService.addLenguajeConvocatoria(this.nuevoLenguajeForm.value) : ''
  }
}
