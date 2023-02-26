import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionConvocatoriaComponent } from './edition.component';

describe('EditionComponent', () => {
  let component: EditionConvocatoriaComponent;
  let fixture: ComponentFixture<EditionConvocatoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditionConvocatoriaComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditionConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
