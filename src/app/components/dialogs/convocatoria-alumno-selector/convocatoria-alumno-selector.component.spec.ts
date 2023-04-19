import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocatoriaAlumnoSelectorComponent } from './convocatoria-alumno-selector.component';

describe('ConvocatoriaAlumnoSelectorComponent', () => {
  let component: ConvocatoriaAlumnoSelectorComponent;
  let fixture: ComponentFixture<ConvocatoriaAlumnoSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvocatoriaAlumnoSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvocatoriaAlumnoSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
