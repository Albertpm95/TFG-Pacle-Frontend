import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprensionAuditivaComponent } from './comprension-auditiva.component';

describe('ComprensionAuditivaComponent', () => {
  let component: ComprensionAuditivaComponent;
  let fixture: ComponentFixture<ComprensionAuditivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprensionAuditivaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprensionAuditivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
