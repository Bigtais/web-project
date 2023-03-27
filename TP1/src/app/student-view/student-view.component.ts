import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'sd-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent {
  isAuth:boolean = false;
  students:any;
  studentSubscription?:Subscription;

  lastUpdate:Promise<Date> = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
    () => {
    resolve(date);
    }, 3000
    );
    });

  constructor(private studentService: StudentService){
    setTimeout(() => {
      this.isAuth = true;
    }, 4000);
  }

  ngOnInit(){
    this.studentSubscription = this.studentService.studentsSubject.subscribe(
      (students: any[]) => {
        this.students = students;
      }
      );
      this.studentService.emitStudentSubject();
  }

  ngOnDestroy(){
    this.studentSubscription?.unsubscribe();
  }

  allPresent(){
    alert("ILS SONT TOUS LA AAAAAAAAAAAAAA")
    this.studentService.switchOnAll()
  }

  allAbsent() {
    if(confirm('Etes-vous sûr qu\’ils sont tous absents ?')) {
    this.studentService.switchOffAll();
    }
  }
}
