import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActaComponent } from './create.component';

describe('CreateActaCompoent', () => {
  let component: CreateActaComponent; CreateActaComponent
  let fixture: ComponentFixture<CreateActaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateActaComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateActaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
