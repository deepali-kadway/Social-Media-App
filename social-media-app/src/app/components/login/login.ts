import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login as LoginSchema} from '../../models/login.model';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm!: FormGroup;

  get loginInput(){return this.loginForm.get('loginInput')}
  get passwordInput() {return this.loginForm.get('passwordInput')}

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService){
    this.loginForm = this.fb.group({
      loginInput: ['', Validators.required],
      passwordInput: ['', [Validators.required, Validators.minLength(8)]]
})
}

detectInputType(input: string): 'emailInput' | 'phoneInput' | 'usernameInput' {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(emailRegex.test(input)){
    return 'emailInput';
  }

  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if(phoneRegex.test(input)){
    return 'phoneInput';
  }

  return 'usernameInput';
}

  onLogin(){
    if(this.loginForm.valid){
      const loginData = this.loginForm.value;
      // console.log(loginData);
      const inputType = loginData.loginInput;
      // console.log(inputType);
      
      const inputIdentifierType = this.detectInputType(inputType)

      const loginPayload: LoginSchema = {
        inputIdentifier: inputType,
        inputIdentifierType: inputIdentifierType,
        passwordInput: loginData.passwordInput
      };

      this.loginService.login(loginPayload).subscribe({
        next: (response) => {
          alert("Login is Successfull!")
          this.router.navigate(['/profile'])
        },
        error: (error) => {
          alert("Login Failed: " + error.error?.message || error.message)
        }
      })
    }
    else{
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched
      })
    }
  }

  navigateToRegister(){
    this.router.navigate(['/registration'])
  }

}
