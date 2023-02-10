import { Component } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.scss'],
})
export class CargaComponent {
  ficheroExcel!: File;

  constructor(private apiService: ApiService) {}

  seleccionFichero(file: File) {}

  cargarFicheroExcel(file: File) {
    return this.apiService.subirFicheroExcel(file);
  }
}
