import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-acta',
  templateUrl: './acta.component.html',
  styleUrls: ['./acta.component.scss']
})
export class ActaComponent {

  actaForm: FormGroup;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.actaForm = this.formBuilder.group({

    })
  }
}
