import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Horario } from '@models/horario';
import { ApiService } from '@services/api.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-horarios',
    templateUrl: './horarios.component.html',
    styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent {

    nuevoHorarioForm = new FormControl()
    horarios$: Observable<Horario[]> = this.apiService.getHorariosConvocatoria()

    private destroy$: Subject<boolean> = new Subject<boolean>()

    constructor(private apiService: ApiService) { }

    public deleteHorarioConvocatoria(idHorario: number) {
        idHorario ? this.apiService.deleteHorarioConvocatoria(idHorario) : ''
    }

    public addHorarioConvocatoria() {
        this.nuevoHorarioForm.valid ? this.apiService.addHorarioConvocatoria(this.nuevoHorarioForm.value).pipe(takeUntil(this.destroy$)).subscribe() : ''
    }

    ngOnDestroy() {
        this.destroy$.next(true)
    }
}
