import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { Convocatoria } from '@models/convocatoria';
import { Horario } from '@models/horario';
import { API_ENDPOINTS } from '@constants';
import { MockUpDB } from '@models/mockup';

describe('ApiService', () => {
    let service: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApiService]
        });
        service = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('getConvocatorias', () => {
        it('should return an Observable<Convocatoria[]>', () => {
            const convocatorias: Convocatoria[] = MockUpDB.convocatoriasMockUp;

            service.getConvocatorias().subscribe(result => {
                expect(result.length).toBe(4);
                expect(result).toEqual(convocatorias);
            });

            const req = httpMock.expectOne(service.apiUrl + API_ENDPOINTS.CONVOCATORIA_LIST);
            expect(req.request.method).toBe('GET');
            req.flush(convocatorias);
        });
    });

    describe('addHorarioConvocatoria', () => {
        it('should return an Observable<Horario>', () => {
            const horario: Horario = MockUpDB.horarioMockUp1;

            service.addHorarioConvocatoria(horario.horario).subscribe(result => {
                expect(result).toEqual(horario);
            });

            const req = httpMock.expectOne(service.apiUrl + API_ENDPOINTS.CONFIG_HORARIO_CREATE);
            expect(req.request.method).toBe('PUT');
            expect(req.request.body.horario).toBe(horario.horario);
            req.flush(horario);
        });
    });

});
