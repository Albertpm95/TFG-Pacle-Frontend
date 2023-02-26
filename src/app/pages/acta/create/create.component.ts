import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Convocatoria } from '@models/convocatoria'

import { ApiService } from '@services/api.service'
import { Constants } from 'app/constants'
import { Observable } from 'rxjs/internal/Observable'

@Component({
  selector: 'app-acta',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateActaComponent {
  constants = Constants
  convocatoriaNuevaForm: FormGroup = new FormGroup({})
  convocatoriaNueva: Convocatoria = new Convocatoria()
  loading: boolean = false
  listaIdiomasActa$: Observable<string[]> = this.apiService.getIdiomasActa()
  tiposActa$: Observable<string[]> = this.apiService.getTiposActa()
  horariosActa$: Observable<string[]> = this.apiService.getHorariosActa()

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) {

  }
  ngOnInit(): void { this.initializeForm() }

  private initializeForm(): void {
  }
  public createActa(): void {

  }
}
