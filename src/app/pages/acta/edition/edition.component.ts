import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '@services/api.service';

@Component({
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent {
  @Input() id_acta?: number

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) {

  }
  ngOnInit(): void {

  }

  private initializeForm(): void {
    console.log('Initialize Acta form')
  }
  public createActa(): void {
  }
}
