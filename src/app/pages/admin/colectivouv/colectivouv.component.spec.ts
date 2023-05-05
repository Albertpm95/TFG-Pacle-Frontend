import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ColectivouvComponent } from './colectivouv.component'

describe('ColectivouvComponent', () => {
  let component: ColectivouvComponent
  let fixture: ComponentFixture<ColectivouvComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColectivouvComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(ColectivouvComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
