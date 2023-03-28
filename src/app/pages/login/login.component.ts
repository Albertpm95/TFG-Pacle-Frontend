import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { API_ENDPOINTS, COMPONENTS, MODULES } from '@constants'
import { AuthService } from '@services/auth.service'

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({})
  loading: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.inicializarForm()
  }

  private inicializarForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  public login(): void {
    this.loading = true
    if (this.loginForm.status == 'VALID') {
      let login_form_data = new FormData()
      login_form_data.append('username', this.loginForm.value.username)
      login_form_data.append('password', this.loginForm.value.password)
      this.authService.login(login_form_data)//.subscribe((data) => {        this.router.navigateByUrl(COMPONENTS.MENU)      })
    }
    this.router.navigateByUrl(MODULES.CONVOCATORIA + '/' + COMPONENTS.LIST) // TODO Remove
  }

  ngOnDestroy() {
    this.loading = true
  }
}
