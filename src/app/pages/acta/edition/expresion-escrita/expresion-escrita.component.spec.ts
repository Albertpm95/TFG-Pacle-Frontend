import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpresionEscritaComponent } from './expresion-escrita.component';

describe('ExpresionEscritaComponent', () => {
  let component: ExpresionEscritaComponent;
  let fixture: ComponentFixture<ExpresionEscritaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpresionEscritaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpresionEscritaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
