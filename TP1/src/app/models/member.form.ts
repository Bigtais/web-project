import { FormControl, Validators } from '@angular/forms';
import { Member } from './member.model';
export class MemberForm {
  firstName = new FormControl();
  lastName = new FormControl();
  mobile = new FormControl();
  constructor(member: Member) {
    // Si un prénom est fourni, on l'affecte
    if (member.firstName) {
      this.firstName.setValue(member.firstName);
    }
    // First Name, obligatoire
    this.firstName.setValidators([Validators.required]);
    // Si un nom est fourni, on l'affecte
    if (member.lastName) {
      this.lastName.setValue(member.lastName);
    }
    // Last Name, obligatoire
    this.lastName.setValidators([Validators.required]);
    // Mobile, optionnel
    if (member.mobile) {
      this.mobile.setValue(member.mobile);
      this.mobile.setValidators([Validators.pattern("[0-9]{10}$")]);
    }
  }
}
