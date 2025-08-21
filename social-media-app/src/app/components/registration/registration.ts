import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegistrationModel } from '../../models/registration-model'
import { RegistrationService } from '../../services/registration-service'
import { LoginService } from '../../services/login-service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration {
  registrationForm: FormGroup;

// Adding Getters. getter return the form control object
get nameInput(){
  return this.registrationForm.get('nameInput')
}

get emailInput(){
  return this.registrationForm.get('emailInput')
}

get phoneInput(){
  return this.registrationForm.get('phoneInput')
}
get usernameInput(){
  return this.registrationForm.get('usernameInput')
}

get passwordInput(){
  return this.registrationForm.get('passwordInput')
}

get confirmpasswordInput(){
  return this.registrationForm.get('confirmpasswordInput')
}

  constructor(private fb: FormBuilder, private regService: RegistrationService, private loginService: LoginService, private router: Router){
    this.registrationForm = this.fb.group({
      nameInput: ['', Validators.required],
      emailInput: ['', [Validators.required, Validators.email]],
      phoneInput: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      usernameInput: ['', Validators.required],
      passwordInput: ['', [Validators.required, Validators.minLength(8)]],
      confirmpasswordInput: ['', Validators.required]
    })
  }

  onSubmit(){
    if(this.registrationForm.valid){
      // need to send the registrationForm data in form of an object {} to service, which then sends the data to backend.
      const formData: RegistrationModel = this.registrationForm.value;
      
      const user = {
        nameInput: formData.nameInput,
        emailInput: formData.emailInput,
        phoneInput: formData.phoneInput,
        usernameInput: formData.usernameInput,
        passwordInput: formData.passwordInput,
      }
      
      this.regService.register(user).subscribe({
        next: (response) => {
          alert('User Registration is Successful!');
          // Store user data in LoginService after successful registration
          this.loginService.setCurrentUser(response.user);
          this.router.navigate(['/profile'])
        },
        error: (error) => {
          alert('Registration has failed: ' + error.message);
        }
      })  
    }
    else{
      Object.keys(this.registrationForm.controls).forEach(key => {
        this.registrationForm.get(key)?.markAsTouched();
      })
      alert('Please fill in all required fields correctly!')
    }
  }

  //Navigate to Login Page if user already present
  navigateToLogin(){
    this.router.navigate(['/login']);
  }

}
