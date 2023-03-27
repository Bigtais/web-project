import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.sevice';
import { User } from '../models/user.model';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'sd-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  userSubscription!: Subscription;
  users!: User[];

  constructor(private userService: UserService,
    private httpService: HttpService) { }

  onSuppress(email: string) {
    if (confirm('Etes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.suppressUser(email);
    }
    return null;
  }
  suppressUser(email: string) {
    this.httpService.suppUser(email).subscribe((result) => {
      if (result.status === 200) {
        this.ngOnInit();
      } else {
        alert('Cet utilisateur n\'existe pas !');
      }
    })
  }

  ngOnInit() {
    this.userSubscription = this.httpService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    this.userService.emitUsers();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
