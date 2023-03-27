import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { TeamForm } from '../models/team.form';
import { Team } from '../models/team.model';
import { MemberForm } from '../models/member.form';
import { Member } from '../models/member.model';
@Injectable()
export class NestedFormService {
  // Creation du controleur du formulaire
  public teamForm: FormGroup = this.fb.group(new TeamForm(new Team('')));
  constructor(private fb: FormBuilder) { }
  addMember() {
    // On recupere le FormArray
    const currentMembers = this.teamForm.get('members') as FormArray;
    // On ajoute un nouveau FormGroup pour le membre
    currentMembers.push(this.fb.group(new MemberForm(new Member())));
  }
  deleteMember(i: number) {
    // On recupere le FormArray
    const currentMembers = this.teamForm.get('members') as FormArray;
    // On supprime le membre
    currentMembers.removeAt(i);
  }
}
