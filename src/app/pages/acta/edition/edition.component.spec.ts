import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionActaComponent } from './edition.component';

describe('EditionComponent', () => {
  let component: EditionActaComponent;
  let fixture: ComponentFixture<EditionActaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditionActaComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditionActaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
