import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Constants } from '@constants'
import { Acta } from '@models/acta'
import { Alumno } from '@models/alumno'
import { Convocatoria } from '@models/convocatoria'
import { ApiService } from '@services/api.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-correct',
  templateUrl: './correct.component.html',
  styleUrls: ['./correct.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorrectActaComponent {

  @Input() id_acta: number | undefined;

  comprensionLectoraForm: FormGroup = new FormGroup({})
  comprensionAuditivaForm: FormGroup = new FormGroup({})
  expresionEscritaForm: FormGroup = new FormGroup({})
  expresionOralForm: FormGroup = new FormGroup({})
  convocatoria$: Observable<Convocatoria> = new Observable()
  alumno$: Observable<Alumno> = new Observable()
  acta$: Observable<Acta> = new Observable()
  loadingActa$: boolean = true

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
    if (this.id_acta)
      this.apiService.getActa(this.id_acta)

    this.loadingActa$ = this.initializeActa()
  }

  private initializeActa(): boolean {
    return true;
  }

  public updatedComprensionLectora(): Observable<boolean> {
    return this.apiService.updateComprensionLectora()
  }
  public updatedComprensionAuditiva(): Observable<boolean> {
    return this.apiService.updateComprensionAuditiva()
  }
  public updatedExpresionEscrita(): Observable<boolean> {
    return this.apiService.updateExpresionEscrita()
  }
  public updatedExpresionOral(): Observable<boolean> {
    return this.apiService.updateExpresionOral()
  }
  corregirActa() { }

  ngOnDestroy() { }
}
