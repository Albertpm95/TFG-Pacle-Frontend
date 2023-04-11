import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Lenguaje } from '@models/lenguaje';
import { ApiService } from '@services/api.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-lenguajes',
    templateUrl: './lenguajes.component.html',
    styleUrls: ['./lenguajes.component.scss']
})
export class LenguajesComponent {

    nuevoLenguajeForm = new FormControl()
    lenguajes$: Observable<Lenguaje[]> = this.apiService.getLenguajesConvocatoria()

    private destroy$: Subject<boolean> = new Subject<boolean>()

    constructor(private apiService: ApiService) { }

    public deleteLenguajeConvocatoria(idLenguaje: number) {
        idLenguaje ? this.apiService.deleteLenguajeConvocatoria(idLenguaje) : ''
    }

    public addLenguajeConvocatoria() {
        this.nuevoLenguajeForm.valid ? this.apiService.addLenguajeConvocatoria(this.nuevoLenguajeForm.value).pipe(takeUntil(this.destroy$)).subscribe() : ''
    }
    ngOnDestroy() {
        this.destroy$.next(true)
    }
}
