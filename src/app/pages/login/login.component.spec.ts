import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LoginComponent } from './login.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { AuthService } from '@services/auth.service'
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core'
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms'

describe('Login component', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>
  let formBuilder: FormBuilder

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents()
    formBuilder = new FormBuilder()
  })
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Form Validation', () => {
    it('should be invalid when username is empty', () => {
      let username = ''
      const control = component.loginForm.get('username')
      control?.setValue(username)
      expect(control?.valid).toBe(false)
    })
    it('should be invalid when password is empty', () => {
      let password = ''
      const control = component.loginForm.get('password')
      control?.setValue(password)
      expect(control?.valid).toBe(false)
    })
    it('should be invalid when username length is under 6', () => {
      let username = 'usern'
      const control = component.loginForm.get('username')
      control?.setValue(username)
      expect(control?.valid).toBe(false)
    })
    it('should be invalid when password length is under 6', () => {
      let password = 'passw'
      const control = component.loginForm.get('password')
      control?.setValue(password)
      expect(control?.valid).toBe(false)
    })
    it('should be invalid when username length is over 12', () => {
      let username = 'usernameusern'
      const control = component.loginForm.get('username')
      control?.setValue(username)
      expect(control?.valid).toBe(false)
    })
    it('should be invalid when password length is over 24', () => {
      let password = 'passwordpasswordpasswordp'
      const control = component.loginForm.get('password')
      control?.setValue(password)
      expect(control?.valid).toBe(false)
    })
    it('should be invalid when username pattern is not accomplished', () => {
      let username = '_username'
      const control = component.loginForm.get('username')
      control?.setValue(username)
      expect(control?.valid).toBe(false)
    })
    it('should be invalid when password pattern is not accomplished', () => {
      let password = '_password'
      const control = component.loginForm.get('password')
      control?.setValue(password)
      expect(control?.valid).toBe(false)
    })
  })
})
