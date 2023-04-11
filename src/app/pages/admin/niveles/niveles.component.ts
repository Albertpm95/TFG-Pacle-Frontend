import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Nivel } from '@models/nivel';
import { ApiService } from '@services/api.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-niveles',
    templateUrl: './niveles.component.html',
    styleUrls: ['./niveles.component.scss']
})
export class NivelesComponent {

    nuevoNivelForm = new FormControl()
    niveles$: Observable<Nivel[]> = this.apiService.getNivelesConvocatoria()

    private destroy$: Subject<boolean> = new Subject<boolean>()

    constructor(private apiService: ApiService) { }

    public deleteNivelConvocatoria(idNivel: number) {
        idNivel ? this.apiService.deleteNivelConvocatoria(idNivel) : ''
    }

    public addNivelConvocatoria() {
        this.nuevoNivelForm.valid ? this.apiService.addNivelConvocatoria(this.nuevoNivelForm.value).pipe(takeUntil(this.destroy$)).subscribe() : ''
    }
    ngOnDestroy() {
        this.destroy$.next(true)
    }
}
