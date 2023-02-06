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
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login(): void {
    this.loading = true;
    if (this.loginForm.status == 'VALID') {
      this.authService.login({
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }).subscribe(data => { if (data) this.router.navigateByUrl('/home') })
    }
    this.loading = false;
  }
}
