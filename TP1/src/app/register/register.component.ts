import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUp } from '../models/signup.model';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'sd-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form!: FormGroup;

  constructor(private registerService: RegisterService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  submit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const newSign = new SignUp(formValue['username'], formValue['password']);
      this.registerService.register(newSign);
      this.router.navigate(['auth']);
    }
    else {
      // On affiche les éléments non correctement renseignés
      this.validateAllFormFields(this.form);
    }
  }

  get getForm(): { [key: string]: AbstractControl; } {
    return this.form.controls;
  }

  buildForm() {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
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

}
