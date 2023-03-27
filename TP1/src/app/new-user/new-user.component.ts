import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/user.model';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'sd-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  // userForm !: FormGroup;
  formGr !: FormGroup;
  formSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.setUserCategoryValidators();
  }

  //convenience getter for easy access to form fields
  get form(): { [key: string]: AbstractControl; } {
    return this.formGr.controls;
  }
  buildForm() {
    this.formGr = this.formBuilder.group({
      /* key: [ defaultValue, [validator, validator, ...] ]*/
      email: [null, [Validators.required, Validators.email]],
      username: [null, [Validators.required, Validators.minLength(3)]],
      userCategory: ['employee'],
      institution: [null],
      company: [null, [Validators.required]],
      salary: [null, [Validators.required]],
    });
  }
  /** On marque tous les FormControl comme "touché" */
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

  setUserCategoryValidators() {
    /* Récupération des références aux éléments du formulaire */
    const institutionControl = this.form['institution'];
    const companyControl = this.formGr.get('company');
    const salaryControl = this.formGr.get('salary');
    /* On écoute les changements de valeur pour le type d'utilisateur */
    this.formGr.get('userCategory')!
      .valueChanges.subscribe((userCategory) => {
        if (userCategory === 'student') {
          /* On modifie les validateurs si la catégorie est student */
          institutionControl!.setValidators([Validators.required]);
          companyControl!.setValidators(null);
          salaryControl!.setValidators(null);
        } else if (userCategory === 'employee') {
          /* On modifie les validateurs si la catégorie est employee */
          institutionControl!.setValidators(null);
          companyControl!.setValidators([Validators.required]);
          salaryControl!.setValidators([Validators.required]);
        }
        /* On recalcule la validité des controles */
        institutionControl!.updateValueAndValidity();
        companyControl!.updateValueAndValidity();
        salaryControl!.updateValueAndValidity();
      });
  }

  reset() {
    // On réinitialise le formulaire
    this.formGr.reset();
    // On repositionne userCategory à 'employee'
    this.form['userCategory'].setValue('employee');
  }

  async submit() {
    if (this.formGr.valid) {
      // Le formulaire est valide
      const formValue = this.formGr.value;
      const newUser = new User(
        formValue['email'],
        formValue['username'],
        formValue['userCategory'],
        formValue['institution'],
        formValue['company'],
        formValue['salary']
      );
      // this.httpService.createUser(newUser).subscribe((response) => {
      //   if (response && response.status == 200) {
      //     alert('Utilisateur créé');
      //   } else {
      //     alert('Utilisateur déjà existant dans le système !');
      //   };
      // }, (e) => {
      //   console.log('Erreur : ', e);
      // }, () => {
      //   this.router.navigate(['/users']);
      // }
      // );
      await firstValueFrom(this.httpService.createUser(newUser)).then((response) => {
        if (response.status == 200) {
          alert('Utilisateur créé');
        } else {
          alert('Utilisateur déjà existant dans le système !');
        };
      });
      this.router.navigate(['/users']);
    } else {
      // On affiche les éléments non correctement renseignés
      this.validateAllFormFields(this.formGr);
    }
  }

}
