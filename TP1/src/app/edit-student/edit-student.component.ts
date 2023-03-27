import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sd-edit-student-component',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent {

  defaultStatus = "Absent";

  constructor(private studentService:StudentService, private route:ActivatedRoute, private router:Router){}

  onSubmit(form:NgForm){
    const name = form.value['name'];
    const status = form.value['status'];
    this.studentService.addStudent(name, status);
    this.router.navigate(["students"]);
  }

}
