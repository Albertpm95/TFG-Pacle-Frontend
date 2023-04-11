import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Genero } from '@models/genero';
import { ApiService } from '@services/api.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-generos',
    templateUrl: './generos.component.html',
    styleUrls: ['./generos.component.scss']
})
export class GenerosComponent {

    nuevoGeneroForm = new FormControl()
    generos$: Observable<Genero[]> = this.apiService.getGenerosAlumno()

    private destroy$: Subject<boolean> = new Subject<boolean>()

    constructor(private apiService: ApiService) { }

    public deleteGeneroAlumno(idGenero: number) {
        idGenero ? this.apiService.deleteGeneroAlumno(idGenero).pipe(takeUntil(this.destroy$)).subscribe() : ''
    }

    public addGeneroAlumno() {
        if (this.nuevoGeneroForm.valid) {
            let lenguaje_nuevo: Genero = { genero: this.nuevoGeneroForm.value }
            this.apiService
                .addGeneroAlumno(lenguaje_nuevo)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    response => {
                        console.log(response)
                        this.nuevoGeneroForm.reset()
                    }
                )
        }
    }

    ngOnDestroy() {
        this.destroy$.next(true)
    }
}
