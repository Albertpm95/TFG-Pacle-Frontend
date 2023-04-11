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
        idGenero ? this.apiService.deleteGeneroAlumno(idGenero) : ''
    }

    public addGeneroAlumno() {
        this.nuevoGeneroForm.valid ? this.apiService.addGeneroAlumno(this.nuevoGeneroForm.value).pipe(takeUntil(this.destroy$)).subscribe() : ''
    }
    ngOnDestroy() {
        this.destroy$.next(true)
    }
}
