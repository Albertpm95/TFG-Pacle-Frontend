import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpresionOralComponent } from './expresion-oral.component';

describe('ExpresionOralComponent', () => {
  let component: ExpresionOralComponent;
  let fixture: ComponentFixture<ExpresionOralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpresionOralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpresionOralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
