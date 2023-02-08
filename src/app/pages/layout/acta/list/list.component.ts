import { Component } from '@angular/core';
import { Acta } from '@models/acta';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListActaComponent {
  loading: boolean = true;
  actas: Acta[] = [];

  constructor(private apiService: ApiService) {
    this.apiService.getActas().subscribe((actas) => {
      if (actas) {
        this.actas = actas;
        this.loading = false;
      }
    });
  }
}
