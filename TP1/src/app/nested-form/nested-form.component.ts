import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { NestedFormService } from '../services/nested-form.service';

@Component({
  selector: 'sd-nested-form',
  templateUrl: './nested-form.component.html',
  styleUrls: ['./nested-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NestedFormService],
})
export class NestedFormComponent implements OnInit {
  // Le controleur du formulaire
  teamForm!: FormGroup;
  // FormArray contenant les membres
  members!: FormArray;
  constructor(private formService: NestedFormService) { }
  ngOnInit() {
    this.teamForm = this.formService.teamForm;
    this.members = this.teamForm.get('members') as FormArray;
  }
  // Ajout d'un membre
  addMember() {
    this.formService.addMember();
  }
  // Suppression d'un membre
  deleteMember(index: number) {
    this.formService.deleteMember(index);
  }
  // Soumission du formulaire
  saveTeam() {
    alert('Equipe enregistrée !');
    // Faire appel au service http qui fera appel à l'API pour stocker les données
  }

}
