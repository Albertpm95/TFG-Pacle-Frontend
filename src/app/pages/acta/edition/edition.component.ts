import { Component } from '@angular/core';
import { Acta } from '@models/acta';
import { FakeDB } from '@models/fake-db';


@Component({
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent {

  acta: Acta = FakeDB.actaFake
  constructor() { }
  ngOnInit(): void {
    console.log(this.acta)
  }
}
