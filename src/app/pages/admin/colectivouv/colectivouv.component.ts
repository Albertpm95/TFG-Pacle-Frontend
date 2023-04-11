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
        idColectivoUV ? this.apiService.deleteColectivoUV(idColectivoUV).pipe(takeUntil(this.destroy$)).subscribe(response => { console.log(response) }) : ''
    }

    public addColectivoUV() {
        if (this.nuevoColectivoUVForm.valid) {
            let colectivoUV: ColectivoUV = { colectivoUV: this.nuevoColectivoUVForm.value }
            this.apiService
                .addColectivoUV(colectivoUV)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    response => {
                        console.log(response)
                        this.nuevoColectivoUVForm.reset()
                    }
                )
        }
    }

    ngOnDestroy() {
        this.destroy$.next(true)
    }
}