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
        idNivel ? this.apiService.deleteNivelConvocatoria(idNivel).pipe(takeUntil(this.destroy$)).subscribe(response => { console.log(response) }) : ''
    }

    public addNivelConvocatoria() {
        if (this.nuevoNivelForm.valid) {
            let nivel_nuevo: Nivel = { nivel: this.nuevoNivelForm.value }
            this.apiService
                .addNivelConvocatoria(nivel_nuevo)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    response => {
                        console.log(response)
                        this.nuevoNivelForm.reset()
                    }
                )
        }
    }

    ngOnDestroy() {
        this.destroy$.next(true)
    }
}
