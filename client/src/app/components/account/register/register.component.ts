import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/models/register-user.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  passwordNotMatch: boolean | undefined;
  apiErrorMessage: string | undefined;

  constructor(private accountService: AccountService, private fb: FormBuilder, private router: Router) { }

  //#region  FormGroup
  registerFg = this.fb.group({
    emailCtrl: ['', [Validators.required, Validators.pattern(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$/)]],
    passwordCtrl: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]],
    confirmPasswordCtrl: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]],
    knownAsCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
  });

  get EmailCtrl(): FormControl {
    return this.registerFg.get('emailCtrl') as FormControl;
  }

  get PasswordCtrl(): FormControl {
    return this.registerFg.get('passwordCtrl') as FormControl;
  }

  get ConfirmPasswordCtrl(): FormControl {
    return this.registerFg.get('confirmPasswordCtrl') as FormControl;
  }

  get KnownAsCtrl(): FormControl {
    return this.registerFg.get('knownAsCtrl') as FormControl;
  }
  //#endregion FormGroup

  //#region  Methods
  register(): void {
    this.apiErrorMessage = undefined;

    if (this.PasswordCtrl.value === this.ConfirmPasswordCtrl.value) {
      this.passwordNotMatch = false;

      let user: RegisterUser = {
        email: this.EmailCtrl.value,
        password: this.PasswordCtrl.value,
        confirmPassword: this.ConfirmPasswordCtrl.value,
        knownAs: this.KnownAsCtrl.value
      }

      // return: Observable<User>
      this.accountService.registerUser(user).subscribe({
        next: user => {
          console.log('New user', user);
        }, 
        error: err => this.apiErrorMessage = err.error //console.log(err.error
      })
    }
    else {
      this.passwordNotMatch = true;
    }
  }

  getState(): void {
    console.log(this.registerFg);
  }
  //#endregion Methods
}
