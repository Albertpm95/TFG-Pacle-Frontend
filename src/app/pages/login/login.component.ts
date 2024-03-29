import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { COMPONENTS, MODULES } from '@constants'
import { AuthService } from '@services/auth.service'
import { StorageService } from '@services/storage.service'
import { Subject, takeUntil } from 'rxjs'

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({})
  loading = false

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.inicializarForm()
  }

  private inicializarForm(): void {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [Validators.minLength(6), Validators.maxLength(12), Validators.pattern('^[a-zA-Z][a-zA-Z0-9_]+$')]
      ],
      password: ['', [Validators.required]]
    })
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.loading = true
      const loginFormData = new FormData()
      loginFormData.append('username', this.loginForm.value.username)
      loginFormData.append('password', this.loginForm.value.password)
      this.authService
        .login(loginFormData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            this.storageService.saveUser(data)
            this.loading = false
            this.router.navigateByUrl(MODULES.CONVOCATORIA + '/' + COMPONENTS.LIST)
          },
          error: (err) => {
            this.storageService.clean()
            this.loading = false
          }
        })
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true)
  }
}
