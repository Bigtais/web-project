import {
  Component,
  OnInit,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter,
} from '@angular/core';
@Component({
  selector: 'sd-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberComponent implements OnInit {
  // Le controleur du formulaire
  @Input() memberForm: any;
  // L'identifiant de l'élément, pour le supprimer
  @Input() index!: number;
  // Evenement envoyé lors de la suppression
  @Output() deleteMember: EventEmitter<number> = new EventEmitter();
  constructor() { }
  ngOnInit() { }
  delete() {
    this.deleteMember.emit(this.index);
  }
}
