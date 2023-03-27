import { Component } from '@angular/core';
import { Acta } from '@models/acta';
import { MockUpDB } from '@models/mockup';


@Component({
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent {

  acta: Acta = MockUpDB.actaMockUp
  constructor() { }
  ngOnInit(): void {
    console.log(this.acta)
  }
}
