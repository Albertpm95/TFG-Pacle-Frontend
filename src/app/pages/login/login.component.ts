import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';
import { AuthService } from '@services/auth.service';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login(): void {
    if (this.loginForm.status == 'VALID') {
      console.log(this.loginForm);

      this.authService.login({
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }).subscribe(data => console.log('Login succes', data))
    }

    this.router.navigateByUrl('/home');
  }
}
