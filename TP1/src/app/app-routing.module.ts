import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthGuard } from './services/auth-guard.service';
import { SingleStudentComponent } from './single-student/single-student.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { UserListComponent } from './user-list/user-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { NestedFormComponent } from './nested-form/nested-form.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'students' },
  { path: 'register', component: RegisterComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'students', canActivate: [AuthGuard], component: StudentViewComponent },
  { path: 'students/:id', canActivate: [AuthGuard], component: SingleStudentComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: 'edit', canActivate: [AuthGuard], component: EditStudentComponent },
  { path: 'users', canActivate: [AuthGuard], component: UserListComponent },
  { path: 'new-user', canActivate: [AuthGuard], component: NewUserComponent },
  { path: 'new-team', canActivate: [AuthGuard], component: NestedFormComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [StudentViewComponent, AuthComponent]
