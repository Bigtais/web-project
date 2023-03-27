import { FormArray, FormControl, Validators } from '@angular/forms';
import { Team } from './team.model';

export class TeamForm {
  name = new FormControl();
  members = new FormArray<any>([]);
  constructor(team: Team) {
    if (team.name) {
      this.name.setValue(team.name);
    }
    this.name.setValidators([Validators.required]);
    if (team.members) {
      // Boucler sur les membres et les ajouter au FormArray
      // ...
      team.members.forEach(
        (member) =>
          this.members.push(member)
      );
    }
  }
}
