import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUp } from '../models/signup.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'sd-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  authStatus?: boolean;

  form!: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
    this.buildForm();
  }

  get getForm(): { [key: string]: AbstractControl; } {
    return this.form.controls;
  }
  buildForm() {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required]],
    });
  }

  goToRegister() {
    this.router.navigate(["/register"]);
  }

  async onSignIn() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const newSign = new SignUp(formValue['username'], formValue['password']);
      await this.authService.signIn(newSign);
      this.authStatus = this.authService.isAuth;
      this.router.navigate(['students']);
    }
    else {
      // On affiche les éléments non correctement renseignés
      this.validateAllFormFields(this.form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        // onlySelf: true, la modification n'est pas propagée au parent
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
  }

}
