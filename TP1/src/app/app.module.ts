import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from './services/student.service';
import { AuthService } from './services/auth.service';
import { SingleStudentComponent } from './single-student/single-student.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthGuard } from './services/auth-guard.service';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { UserListComponent } from './user-list/user-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { HttpClientModule } from "@angular/common/http";
import { MemberComponent } from './member/member.component';
import { NestedFormComponent } from './nested-form/nested-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    routedComponents,
    SingleStudentComponent,
    FourOhFourComponent,
    EditStudentComponent,
    UserListComponent,
    NewUserComponent,
    MemberComponent,
    NestedFormComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDividerModule,
    MatButtonModule

  ],
  providers: [StudentService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
