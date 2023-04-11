import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ColectivoUV } from '@models/colectivouv';
import { ApiService } from '@services/api.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-colectivouv',
    templateUrl: './colectivouv.component.html',
    styleUrls: ['./colectivouv.component.scss']
})
export class ColectivouvComponent {

    nuevoColectivoUVForm = new FormControl()
    colectivosUV$: Observable<ColectivoUV[]> = this.apiService.getColectivosUV()

    private destroy$: Subject<boolean> = new Subject<boolean>()

    constructor(private apiService: ApiService) { }

    public deleteColectivoUV(idColectivoUV: number | undefined) {
        idColectivoUV ? this.apiService.deleteColectivoUV(idColectivoUV) : ''
    }

    public addColectivoUV() {
        this.nuevoColectivoUVForm.valid ? this.apiService.addColectivoUV(this.nuevoColectivoUVForm.value).pipe(takeUntil(this.destroy$)).subscribe() : ''
    }
    ngOnDestroy() {
        this.destroy$.next(true)
    }
}