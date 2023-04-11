import { Component } from '@angular/core'
import { FormControl, RequiredValidator, Validators } from '@angular/forms'
import { Lenguaje } from '@models/lenguaje'
import { ApiService } from '@services/api.service'
import { Observable, Subject, takeUntil } from 'rxjs'

@Component({
    selector: 'app-lenguajes',
    templateUrl: './lenguajes.component.html',
    styleUrls: ['./lenguajes.component.scss'],
})
export class LenguajesComponent {
    nuevoLenguajeForm = new FormControl()
    lenguajes$: Observable<Lenguaje[]> =
        this.apiService.getLenguajesConvocatoria()

    private destroy$: Subject<boolean> = new Subject<boolean>()

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.nuevoLenguajeForm.setValidators([Validators.required])
    }

    public deleteLenguajeConvocatoria(idLenguaje: number) {
        idLenguaje ? this.apiService.deleteLenguajeConvocatoria(idLenguaje).pipe(takeUntil(this.destroy$)).subscribe(response => { console.log(response) }) : ''
    }

    public addLenguajeConvocatoria() {
        if (this.nuevoLenguajeForm.valid) {
            let lenguaje_nuevo: Lenguaje = { lenguaje: this.nuevoLenguajeForm.value }
            this.apiService
                .addLenguajeConvocatoria(lenguaje_nuevo)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    response => {
                        console.log(response)
                        this.nuevoLenguajeForm.reset()
                    }
                )
        }
    }

    ngOnDestroy() {
        this.destroy$.next(true)
    }
}
